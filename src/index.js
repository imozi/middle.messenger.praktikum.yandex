import { routes } from './pages';

const body = document.querySelector('body');
const content = routes[document.location.pathname]
  ? routes[document.location.pathname]
  : routes['/404'];
body.insertAdjacentHTML('afterbegin', content());
