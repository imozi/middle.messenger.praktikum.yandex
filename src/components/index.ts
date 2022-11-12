import Templater from 'core/Templater';
import { Header } from './Header';
import { Button } from './Button';
import { Link } from './Link';
import { Label } from './Label';
import { Input } from './Input';
import { Icon } from './Icon';
import { Notification } from './Notification';
import { ChatRoom } from './ChatRoom';
import { Navigation } from './Navigation';
import { Avatar } from './Avatar';
import { NewMessage } from './NewMessage';
import { Message } from './Message';
import { NewChat } from './NewChat';
import { ChatMenu } from './ChatMenu';
import { Correspondence } from './Correspondence';

const component = [
  Link,
  Button,
  Header,
  Label,
  Input,
  Icon,
  Notification,
  ChatRoom,
  Navigation,
  Avatar,
  NewMessage,
  Message,
  NewChat,
  Correspondence,
  ChatMenu,
];
component.forEach((component) => Templater.regComponents(component));
