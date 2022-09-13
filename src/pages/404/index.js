import Templater from '../../utils/Templater';
import template from './404.tmpl';

Templater.regTmpl('notFound', template);

export const notFound = {
  title: '404 | Messanger',
  context: Templater.renderTmpl('notFound'),
};
