import { Component } from 'core/Component';
import { Nullable } from 'core/types';

export class Route {
  private _path: string;

  private _Builder: typeof Component;

  private _component: Nullable<Component>;

  private _root: Nullable<HTMLElement>;

  constructor(path: string, builder: typeof Component, root: string) {
    this._path = path;
    this._Builder = builder;
    this._component = null;
    this._root = document.querySelector(root);
  }

  public match(path: string): boolean {
    return path === this._path;
  }

  public unmount() {
    if (this._component) {
      this._component.getEl().remove();
      this._component.evtBus().emit(Component.EVENTS.FLOW_CWU);
    }
  }

  public mount(): void | never {
    if (!this._component) {
      this._component = new this._Builder();
    }

    if (!this._root) {
      throw new Error('Root не найден!');
    }

    window.onload = () => (this._root!.ariaBusy = 'false');
    this._root.append(this._component?.getEl());
  }
}
