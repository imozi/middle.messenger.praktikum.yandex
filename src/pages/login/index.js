import Templater from '../../utils/Templater';
import { template } from './login.tmpl';
import { data } from './data';

Templater.regTmpl('Login', template);

const Login = {
  title: 'Вход | Messanger',
  context: Templater.renderTmpl('Login', data),
};

export { Login };
