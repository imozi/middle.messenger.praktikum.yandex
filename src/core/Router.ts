import '../components';
import { HomePage } from '../pages/Home';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { NotFound } from '../pages/Error/404';
import { ServError } from '../pages/Error/500';

type Routes = {
  [key: string]: Function;
};

const routes: Routes = {
  '/': () => new HomePage(),
  '/login': () => new LoginPage(),
  '/registration': () => new RegistrationPage(),
  '/404': () => new NotFound(),
  '/500': () => new ServError(),
};

export { routes };
