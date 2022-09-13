import Templater from '../../utils/Templater';
import template from './home.tmpl';

Templater.regTmpl('home', template);

export const home = {
  title: 'OziHub | Messanger',
  context: Templater.renderTmpl('home'),
};
