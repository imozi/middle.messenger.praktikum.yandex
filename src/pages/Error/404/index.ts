import Templater from '../../../utils/Templater';
import { template } from './404.tmpl';
import { data } from './data';

Templater.regTmpl('NotFound', template);

const NotFound = {
  title: '404 | Messanger',
  context: Templater.renderTmpl('NotFound', data),
};

export { NotFound };
