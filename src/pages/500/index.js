import Templater from '../../utils/Templater';
import template from './500.tmpl';
import { data } from './data';

Templater.regTmpl('servError', template);

export const servError = {
  title: '500 | Messanger',
  context: Templater.renderTmpl('servError', data),
};
