import '../components';
import { Home } from './Home';
import { Login } from './Login';
import { Registration } from './Registration';
import { NotFound } from './Error/404';
import { ServError } from './Error/500';
import { getRouteContent } from '../utils/getRouteContent';

type Routes = {
  [key: string]: Function;
};

const routes: Routes = {
  '/': getRouteContent(Home),
  '/login': getRouteContent(Login),
  '/registration': getRouteContent(Registration),
  '/404': getRouteContent(NotFound),
  '/500': getRouteContent(ServError),
};

export { routes };
