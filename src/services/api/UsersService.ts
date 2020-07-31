import BaseService from './BaseService';
import { UserUrls } from './urls';
import { get_connected_user_mock, list_users_mock } from 'services/mocks';

class UsersService {
  static get_connected_user = () => {
    if ((window as any).mocked) {
      return get_connected_user_mock();
    } else {
      return BaseService.getRequest(UserUrls.GET_LOGGED_USER, true);
    }
  };

  static list_users = () => {
    if ((window as any).mocked) {
      return list_users_mock();
    } else {
      return BaseService.getRequest(UserUrls.LIST_USERS, true);
    }
  };
}

export default UsersService;
