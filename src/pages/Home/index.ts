import { HOCRouter, HOCStore } from 'core/utils/HOCS';
import { HomePage as Page } from './home';

export const HomePage = HOCRouter(
  HOCStore((store) => ({ user: store.user }), Page),
);
