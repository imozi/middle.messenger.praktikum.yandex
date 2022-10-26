import Templater from 'core/Templater';
import { Profile } from './Profile';

const partials = [Profile];
partials.forEach((partial) => Templater.regComponents(partial));
