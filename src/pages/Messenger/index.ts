import { HOCStore } from 'core/utils/HOCS';

import { MessengerPage as Page } from './messenger';

export const MessengerPage = HOCStore(
  (store) => ({ chats: store.chats }),
  Page,
);
