import { Nullable } from 'core/types';
import { store } from 'store';
import { Route } from './Route';

export class Router {
  private _root: string;

  private _routes: Route[] = [];

  private _history = window.history;

  private _currentRoute: Nullable<Route> = null;

  constructor(root: string = '#root') {
    this._root = root;
  }

  private _getRoute(path: string): Route {
    return (
      this._routes.find((route) => route.match(path)) || this._getRoute('/404')
    );
  }

  private _onRoute(path: string): void {
    let route = this._getRoute(path);

    if (route.isPrivate && !store.getStore().user) {
      this._history.pushState({}, '', '/sign-in');
      route = this._getRoute('/sign-in');
    }

    if (this._currentRoute) {
      this._currentRoute.unmount();
    }

    this._currentRoute = route;

    route.mount();
  }

  public use(path: string, builder: any, isPrivate?: boolean): Router {
    const route = new Route(path, builder, this._root, isPrivate);

    this._routes.push(route);

    return this;
  }

  public go(path: string) {
    this._history.pushState({}, '', path);
    this._onRoute(path);
  }

  public back(): void {
    this._history.back();
  }

  public forward(): void {
    this._history.forward();
  }

  public start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }
}
