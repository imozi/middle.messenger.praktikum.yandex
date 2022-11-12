import { v4 as makeUUID } from 'uuid';
import Templater from 'core/Templater';
import { Nullable, Rec } from 'core/types';
import { EventBus } from 'core/EventBus';
import { deepCompare, isEmpty } from 'core/utils';

type CustomEventsProps = {
  name: string;
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  };
};

export class Component<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWDM: 'flow:component-will-did-mount',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  public static componentName: string;

  public id: string = makeUUID();

  private _el: Nullable<HTMLElement> = null;

  protected props: Rec<any> = {};

  protected children: Rec<Component> = {};

  protected state: Rec<any> = {};

  protected refs: Rec<Component> = {};

  evtBus: () => EventBus;

  public constructor(props?: Props) {
    const eventBus = new EventBus();
    this.evtBus = () => eventBus;

    if (props) {
      this.props = this._makeProxyProps(props);
    }

    this._regEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  get el() {
    return this._el;
  }

  private _makeProxyProps<P>(props: Rec<P>) {
    let waitUpdate = false;

    return new Proxy(props, {
      get(target, prop: string) {
        const value: any = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const oldProps = { ...target };

        if (target[prop] === value) {
          return true;
        }

        target[prop] = value;

        if (!waitUpdate) {
          waitUpdate = true;
          setTimeout(() => {
            this.evtBus().emit(Component.EVENTS.FLOW_CDU, oldProps, target);
            waitUpdate = false;
          }, 0);
        }

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

    if (this.el) {
      this._removeEvents();
    }

    this._el?.replaceWith(el);
    this._el = el;

    this._addEvents();
    this.evtBus().emit(Component.EVENTS.FLOW_CWDM);
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');
    const tmpl = Templater.getTemplate(this.id);

    if (!isEmpty<Rec<Component>>(this.children)) {
      this.children = {};
    }

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
    evtBus.on(
      Component.EVENTS.FLOW_CWDM,
      this._componentWillDidMount.bind(this),
    );
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

  private _removeEvents(): void {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._el!.removeEventListener(event, listener);
    });
  }

  private _componentWillDidMount(): void {
    this.componentWillDidMount();
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  private _componentWillUpdate(oldProps: any, nextProps: any): boolean {
    this.componentWillUpdate();
    return deepCompare(oldProps, nextProps);
  }

  private _componentDidUpdate(oldProps: any, nextProps: any): void {
    const isProps = this._componentWillUpdate(oldProps, nextProps);

    if (isProps) {
      return;
    }
    this._render();
  }

  private _componentWillUnmount() {
    this.evtBus().emit(Component.EVENTS.FLOW_RENDER);
    this.componentWillUnmount();
  }

  public dispatchEvent({ name, options }: CustomEventsProps): void {
    this.getEl().dispatchEvent(new Event(name, options));
  }

  public componentDidMount(): void {}

  public componentWillDidMount(): void {}

  public componentWillUnmount(): void {}

  public componentWillUpdate(): void {}

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

  public setProps = <P>(nextProps?: P): void => {
    if (!nextProps) {
      return;
    }

    if (isEmpty(this.props)) {
      this.props = this._makeProxyProps<P>(nextProps);
      this.evtBus().emit(Component.EVENTS.FLOW_RENDER);
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public setState = <S>(nextState?: S): void => {
    if (!nextState) {
      return;
    }

    if (isEmpty(this.state)) {
      this.state = this._makeProxyProps<S>(nextState);
      return;
    }

    Object.assign(this.state, nextState);
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
