import { v4 as makeUUID } from 'uuid';
import Templater from 'core/Templater';
import { Nullable, Rec } from 'core/types';
import { EventBus } from 'core/EventBus';
import { deepCompare } from 'core/utils';

type CustomEventsProps = {
  name: string;
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  };
};

export class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public id: string = makeUUID();

  private _el: Nullable<HTMLElement> = null;

  protected props: Rec<any>;

  protected children: Rec<Component> = {};

  protected state: Rec<any> = {};

  protected refs: Rec<Component> = {};

  evtBus: () => EventBus;

  public constructor(props?: any) {
    const eventBus = new EventBus();
    this.evtBus = () => eventBus;

    this.props = this._makeProxyProps(props || {});
    this.state = this._makeProxyProps(this.state);

    this._regEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  get el() {
    return this._el;
  }

  private _makeProxyProps(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _init(): void {
    Templater.setTemplate(this.id, this.render());
    this.evtBus().emit(Component.EVENTS.FLOW_RENDER);
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
    evtBus.on(Component.EVENTS.INIT, this._init.bind(this));
    evtBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    evtBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    evtBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
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

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  private _componentWillUpdate(nextProps: any): boolean {
    return deepCompare(this.props, nextProps);
  }

  private _componentDidUpdate(nextProps: any): void {
    const assignProps = { ...this.props, ...nextProps };

    const isProps = this._componentWillUpdate(assignProps);

    if (isProps) {
      return;
    }

    this.props = assignProps;
    this._render();
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  public dispatchEvent({ name, options }: CustomEventsProps): void {
    this.getEl().dispatchEvent(new Event(name, options));
  }

  public componentDidMount(): void {}

  public componentWillUnmount(): void {}

  public getEl(): HTMLElement {
    if (this.el?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.el?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.evtBus().emit(Component.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.el!;
  }

  public setProps = <T>(nextProps?: Rec<T>): void => {
    if (!nextProps) {
      return;
    }

    if (!Object.keys(this.props).length) {
      Object.assign(this.props, nextProps);
      this._render();
      return;
    }

    this.evtBus().emit(Component.EVENTS.FLOW_CDU, nextProps);
  };

  public setState = <T>(nextState?: Rec<T>): void => {
    if (!nextState) {
      return;
    }

    if (!Object.keys(this.state).length) {
      Object.assign(this.state, nextState);
      return;
    }

    this.evtBus().emit(Component.EVENTS.FLOW_CDU, nextState);
  };

  public show(): void {
    this.getEl().style.display = 'block';
  }

  public hide(): void {
    this.getEl().style.display = 'none';
  }

  protected render(): string {
    return '';
  }
}
