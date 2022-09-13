import '../components';
import { login } from './login';
import { home } from './home';
import { notFound } from './404';
import { servError } from './500';
import getRouteContent from '../utils/getRouteContent';

export const routes = {
  '/': getRouteContent(home),
  '/login': getRouteContent(login),
  '/404': getRouteContent(notFound),
  '/500': getRouteContent(servError),
};
