import { routes } from './pages';

const root = document.getElementById('root');
let content = routes[document.location.pathname]
  ? routes[document.location.pathname]
  : routes['/404'];

root.insertAdjacentHTML('afterbegin', content());
window.onload = () => (root.ariaBusy = false);
