import { Component } from 'core/Component';
import { Nullable } from 'core/types';

export class Route {
  private _path: string;

  private _Builder: typeof Component;

  private _component: Nullable<Component>;

  private _root: Nullable<HTMLElement>;

  public isPrivate: boolean;

  constructor(
    path: string,
    builder: typeof Component,
    root: Nullable<HTMLElement>,
    isPrivate?: boolean,
  ) {
    this.isPrivate = isPrivate || false;
    this._path = path;
    this._Builder = builder;
    this._component = null;
    this._root = root;
  }

  public match(path: string): boolean {
    return path === this._path;
  }

  public unmount() {
    if (this._component) {
      this._component.evtBus().emit(Component.EVENTS.FLOW_CWU);
      this._component.getEl().remove();
    }
  }

  public mount(): void | never {
    if (!this._component) {
      this._component = new this._Builder();
    }

    if (!this._root) {
      throw new Error('Root не найден!');
    }

    this._root!.ariaBusy = 'false';
    this._root.append(this._component?.getEl());
  }
}
