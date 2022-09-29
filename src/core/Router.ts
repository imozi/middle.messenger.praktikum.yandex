import '../components';
import { HomePage } from '../pages/Home';
// import { Login } from './Login';
// import { Registration } from './Registration';
import { NotFound } from '../pages/Error/404';
// import { ServError } from './Error/500';

type Routes = {
  [key: string]: Function;
};

const routes: Routes = {
  '/': () => new HomePage(),
  // '/login': getRouteContent(Login),
  // '/registration': getRouteContent(Registration),
  '/404': () => new NotFound(),
  // '/500': getRouteContent(ServError),
};

export { routes };
