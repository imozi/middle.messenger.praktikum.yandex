import Templater from '../../utils/Templater';
import template from './login.tmpl';
import { data } from './data';

Templater.regTmpl('login', template);

export const login = {
  title: 'Вход | Messanger',
  context: Templater.renderTmpl('login', data),
};
