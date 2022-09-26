import Templater from '../../utils/Templater';
import { template } from './registration.tmpl';
import { data } from './data';

Templater.regTmpl('Registration', template);

const Registration = {
  title: 'Регистрация | Messanger',
  context: Templater.renderTmpl('Registration', data),
};

export { Registration };
