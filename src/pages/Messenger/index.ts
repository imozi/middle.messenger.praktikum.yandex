import { HOCStore } from 'core/utils/HOCS';

import { MessengerPage as Page } from './messenger';

export const MessengerPage = HOCStore(
  (store) => ({
    chats: store.chats,
    user: { id: store.user.id, login: store.user.login },
  }),
  Page,
);
