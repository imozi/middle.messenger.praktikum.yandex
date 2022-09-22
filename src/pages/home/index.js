import Templater from '../../utils/Templater';
import { template } from './home.tmpl';
import { data } from './data';

Templater.regTmpl('Home', template);

const Home = {
  title: 'OziHub | Messanger',
  context: Templater.renderTmpl('Home', data),
};

export { Home };
