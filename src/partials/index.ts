import Templater from 'core/Templater';
import { Password } from './Password';
import { Profile } from './Profile';
import { Chat } from './Chat';
import { ChatRoomList } from './ChatRoomList';
import { ChatModal } from './ChatModal';

const partials = [Profile, Password, Chat, ChatRoomList, ChatModal];
partials.forEach((partial) => Templater.regComponents(partial));
