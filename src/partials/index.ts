import Templater from 'core/Templater';
import { Profile } from 'partials/Profile';

const partials = [Profile];
partials.forEach((partial) => Templater.regComponents(partial));
