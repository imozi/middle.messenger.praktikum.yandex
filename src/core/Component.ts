import { v4 as generateId } from 'uuid';
import Templater from './Templater/Templater';
import { EventBus } from './EventBus';

export abstract class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_DM: 'flow:did-mount',
    FLOW_DU: 'flow:did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  protected id = generateId();

  protected _el = null;

  protected readonly props;

  protected children = {};

  protected state = {};

  protected refs = {};

  evtBus: () => EventBus;

  public constructor(props: any) {
    const eventBus = new EventBus();
    this.evtBus = () => eventBus;

    this.props = this._makeProxyProps(props || {});

    this._regEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  get el() {
    return this._el;
  }

  _render() {
    this._el = this._compile();
    this._addEvents();
  }

  _compile() {
    const fragment = document.createElement('template');
    const tmpl = Templater.getTemplate(this.id);
    fragment.innerHTML = tmpl({
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.getElementById(id);

      if (!stub) {
        return;
      }

      stub.replaceWith(component.el);
    });

    return fragment.content.firstElementChild;
  }

  _regEvents(evtBus: EventBus) {
    evtBus.on(Component.EVENTS.INIT, this.init.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DM, this._didMount.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DU, this._didUpdate.bind(this));
    evtBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    if (!this.props?.events) {
      return;
    }

    Object.entries(this.props.events).forEach(([event, listener]) => {
      this._el!.addEventListener(event, listener);
    });
  }

  _makeProxyProps(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        self.evtBus().emit(Component.EVENTS.FLOW_DU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _didMount(props) {
    this.didMount(props);
  }

  _didUpdate(oldProps, newProps) {
    const response = this.didUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  didMount() {}

  didUpdate(oldProps, newProps) {
    return true;
  }

  getEl() {
    if (this.el?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.el?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.evtBus().emit(Component.EVENTS.FLOW_DM);
        }
      }, 100);
    }

    return this.el!;
  }

  init() {
    Templater.setTemplate(this.id, this.render());
    this.evtBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  protected render() {
    return '';
  }
}
