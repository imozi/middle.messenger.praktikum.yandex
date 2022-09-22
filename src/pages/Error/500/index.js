import Templater from '../../../utils/Templater';
import { template } from './500.tmpl';
import { data } from './data';

Templater.regTmpl('ServError', template);

const ServError = {
  title: '500 | Messanger',
  context: Templater.renderTmpl('ServError', data),
};

export { ServError };
