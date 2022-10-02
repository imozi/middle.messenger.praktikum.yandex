import { v4 as makeUUID } from 'uuid';
import Templater from './Templater';
import { Nullable } from './utils/type';
import { EventBus } from './EventBus';
import { deepCompare } from './utils';

export abstract class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_DM: 'flow:did-mount',
    FLOW_DU: 'flow:did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = makeUUID();

  protected _el: Nullable<HTMLElement> = null;

  protected readonly props;

  protected children: { [id: string]: Component } = {};

  protected state = {};

  public refs: { [key: string]: Component } = {};

  name: any;

  evtBus: () => EventBus;

  public constructor(props?: any) {
    const eventBus = new EventBus();
    this.evtBus = () => eventBus;

    this.getStateFromProps(props);

    this.props = this._makeProxyProps(props || {});
    this.state = this._makeProxyProps(this.state);

    this._regEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  get el() {
    return this._el;
  }

  _makeProxyProps(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop] = value;
        self.evtBus().emit(Component.EVENTS.FLOW_DU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _render() {
    const el: any = this._compile().firstElementChild;
    this._el?.replaceWith(el);

    this._el = el;
    this._addEvents();
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');
    const tmpl = Templater.getTemplate(this.id);
    fragment.innerHTML = tmpl({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub: Nullable<HTMLElement> = fragment.content.getElementById(id);

      if (!stub) {
        return;
      }

      stub.replaceWith(component.getEl());
    });

    return fragment.content;
  }

  _regEvents(evtBus: EventBus) {
    evtBus.on(Component.EVENTS.INIT, this.init.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DM, this._didMount.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DU, this._didUpdate.bind(this));
    evtBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._el!.addEventListener(event, listener);
    });
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._el!.removeEventListener(event, listener);
    });
  }

  _didMount() {
    this.didMount();
  }

  _didUpdate(oldProps: any, newProps: any): void {
    const isProps = this.didUpdate(oldProps, newProps);

    if (isProps) {
      return;
    }
    this._render();
  }

  didMount() {}

  didUpdate(oldProps: any, newProps: any) {
    return deepCompare(oldProps, newProps);
  }

  getEl(): HTMLElement {
    if (this.el?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.el?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.evtBus().emit(Component.EVENTS.FLOW_DM);
        }
      }, 100);
    }

    return this.el!;
  }

  setProps = (newProps: any) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  init() {
    Templater.setTemplate(this.id, this.render());
    this.evtBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  show() {
    this.getEl().style.display = 'block';
  }

  hide() {
    this.getEl().style.display = 'none';
  }

  protected getStateFromProps(_props: any): void {
    this.state = {};
  }

  protected render(): string {
    return '';
  }
}
