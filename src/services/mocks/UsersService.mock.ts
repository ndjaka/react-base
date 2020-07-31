import { mocked } from 'utils';
import { connected_user, list_users } from 'services/fixtures';

export const get_connected_user_mock = () => {
  return mocked(200, connected_user);
};
export const list_users_mock = () => mocked(200, list_users);
