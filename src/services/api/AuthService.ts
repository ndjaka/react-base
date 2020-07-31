import BaseService from './BaseService';
import { AuthUrls } from './urls';
import { login_mock } from 'services/mocks';

class AuthService {
  static reset_password = (info: object) =>
    BaseService.postRequest(AuthUrls.RESET_PASSWORD, info, false);
  static confirm_reset_password = (info: object) =>
    BaseService.postRequest(AuthUrls.CONFIRM_RESET_PASSWORD, info, false);

  static login = (info: object) => {
    if ((window as any).mocked) {
      return login_mock(info);
    } else {
      return BaseService.postRequest(AuthUrls.LOGINUSER, info, false);
    }
  };

  static signUp = (info: object) =>
    BaseService.postRequest(AuthUrls.SIGNUP, info, false);
}

export default AuthService;
