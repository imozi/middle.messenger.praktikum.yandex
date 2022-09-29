import Templater from 'core/Templater/Templater';
import { Header } from './Header';
import { Button } from './Button';
import { Link } from './Link';
import { Label } from './Label';
import { Input } from './Input';
import { Icon } from './Icon';

const component = [Link, Button, Header, Label, Input, Icon];
component.forEach((c) => Templater.regComponents(c));
