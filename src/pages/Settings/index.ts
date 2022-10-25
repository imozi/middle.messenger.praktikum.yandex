import { HOCRouter, HOCStore } from 'core/utils/HOCS';
import { SettingsPage as Page } from './settings';

export const SettingsPage = HOCRouter(
  HOCStore((store) => ({ user: store.user }), Page),
);
