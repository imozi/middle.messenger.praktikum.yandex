import Templater from 'core/Templater';
import { Password } from './Password';
import { Profile } from './Profile';

const partials = [Profile, Password];
partials.forEach((partial) => Templater.regComponents(partial));
