import '../components';
import { home } from './home';
import { login } from './login';
import { registration } from './registration';
import { notFound } from './404';
import { servError } from './500';
import getRouteContent from '../utils/getRouteContent';

export const routes = {
  '/': getRouteContent(home),
  '/login': getRouteContent(login),
  '/registration': getRouteContent(registration),
  '/404': getRouteContent(notFound),
  '/500': getRouteContent(servError),
};
