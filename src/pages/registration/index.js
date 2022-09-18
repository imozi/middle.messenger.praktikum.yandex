import Templater from '../../utils/Templater';
import template from './registration.tmpl';
import { data } from './data';

Templater.regTmpl('registration', template);

export const registration = {
  title: 'Регистрация | Messanger',
  context: Templater.renderTmpl('registration', data),
};
