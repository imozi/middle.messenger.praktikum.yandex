import { v4 as makeUUID } from 'uuid';
import Templater from 'core/Templater';
import { Nullable } from 'core/types';
import { EventBus } from 'core/EventBus';
import { deepCompare } from 'core/utils';

interface ICustomEventsProps {
  name: string;
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  };
}

export class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_DM: 'flow:did-mount',
    FLOW_DU: 'flow:did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public id: string = makeUUID();

  private _el: Nullable<HTMLElement> = null;

  protected props;

  protected children: Record<string, Component> = {};

  protected state;

  protected refs: Record<string, Component> = {};

  evtBus: () => EventBus;

  public constructor(props?: any) {
    const eventBus = new EventBus();
    this.evtBus = () => eventBus;

    this.initStateWithNotConstructor();
    this.initPropsWithNotConstructor();

    this.props = this._makeProxyProps(props || this.props);
    this.state = this._makeProxyProps(this.state);

    this._regEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  get el() {
    return this._el;
  }

  private _makeProxyProps(props: any) {
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

  private _render(): void {
    const el: any = this._compile().firstElementChild;

    this._el?.replaceWith(el);

    this._el = el;
    this._addEvents();
  }

  private _compile(): DocumentFragment {
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

  private _regEvents(evtBus: EventBus): void {
    evtBus.on(Component.EVENTS.INIT, this.init.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DM, this._didMount.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DU, this._didUpdate.bind(this));
    evtBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents(): void {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._el!.addEventListener(event, listener);
    });
  }

  private _didMount(): void {
    this.didMount();
  }

  private _didUpdate(oldProps: any, newProps: any): void {
    const isProps = this.didUpdate(oldProps, newProps);

    if (isProps) {
      return;
    }

    this._render();
  }

  dispatchEvent({ name, options }: ICustomEventsProps): void {
    this.getEl().dispatchEvent(new Event(name, options));
  }

  didMount(): void {}

  didUpdate(oldProps: any, newProps: any): boolean {
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

  setProps = (newProps: any): void => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  };

  setState = (nextState: any): void => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  init(): void {
    Templater.setTemplate(this.id, this.render());
    this.evtBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  show(): void {
    this.getEl().style.display = 'block';
  }

  hide(): void {
    this.getEl().style.display = 'none';
  }

  protected initStateWithNotConstructor(): void {
    this.state = {};
  }

  protected initPropsWithNotConstructor(): void {
    this.props = {};
  }

  protected render(): string {
    return '';
  }
}
