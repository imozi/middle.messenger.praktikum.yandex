import { routes } from './core/Router';

const root = <HTMLElement>document.getElementById('root');
const content = routes[document.location.pathname]
  ? routes[document.location.pathname]
  : routes['/404'];

root.append(content().getEl());
window.onload = () => (root.ariaBusy = 'false');
