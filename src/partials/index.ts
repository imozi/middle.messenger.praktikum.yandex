import Templater from 'core/Templater';
import { Password } from './Password';
import { Profile } from './Profile';
import { Chat } from './Chat';
import { ChatRoomList } from './ChatRoomList';
import { NewChatModal } from './NewChatModal';

const partials = [Profile, Password, Chat, ChatRoomList, NewChatModal];
partials.forEach((partial) => Templater.regComponents(partial));
