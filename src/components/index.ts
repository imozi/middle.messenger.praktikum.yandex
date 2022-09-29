import Templater from '../core/Templater/Templater';
import { Header } from './Header';
import { Button } from './Button';
import { Link } from './Link';

const component = [Link, Button, Header];
component.forEach((c) => Templater.regComponents(c));
