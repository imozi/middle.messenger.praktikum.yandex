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

    this.props = props;

    this._regEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  get el() {
    return this._el;
  }

  _regEvents(evtBus: EventBus) {
    evtBus.on(Component.EVENTS.INIT, this.init.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DM, this._didMount.bind(this));
    evtBus.on(Component.EVENTS.FLOW_DU, this._didUpdate.bind(this));
    evtBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.evtBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  _didMount() {}

  _didUpdate() {}

  _render() {
    Templater.setTemplate(this.id, this.render());
    this._el = this._compile();
    this._addEvents();
    console.log(Templater);
  }

  _compile() {
    const fragment = document.createElement('template');
    const tmpl = Templater.getTemplate(this.id);
    fragment.innerHTML = tmpl({ ...this.props, children: this.children });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.getElementById(id);

      if (!stub) {
        return;
      }

      stub.replaceWith(component.el);
    });

    return fragment.content.firstElementChild;
  }

  _addEvents() {
    if (!this.props?.events) {
      return;
    }

    Object.entries(this.props.events).forEach(([event, listener]) => {
      this._el!.addEventListener(event, listener);
    });
  }

  protected render() {
    return '';
  }
}
