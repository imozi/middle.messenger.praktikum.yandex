import Templater from 'core/Templater';
import { Header } from './Header';
import { Button } from './Button';
import { Link } from './Link';
import { Label } from './Label';
import { Input } from './Input';
import { Icon } from './Icon';
import { Notification } from './Notification';

const component = [Link, Button, Header, Label, Input, Icon, Notification];
component.forEach((component) => Templater.regComponents(component));
