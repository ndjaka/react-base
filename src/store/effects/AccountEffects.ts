import { ThunkAction } from 'redux-thunk';
import { ApplicationAction, ApplicationState } from 'store/types';
import { loginSuccess } from 'store/actions';
import { UsersService, AuthService } from 'services/api';
import { User } from 'store/types';
import { loginRequest, loginError } from 'store/actions/AccountActions';

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const getUserInfo = (user: User, token: string): Effect => async (
  dispatch,
  getState
) => {
  return UsersService.get_connected_user()
    .then(async (res: any) => {
      if (res.status === 200) {
        let user_temp = await res.json();
        return dispatch(loginSuccess(user_temp, token));
      } else {
        return dispatch(loginSuccess(user, token));
      }
    })
    .catch((err) => {
      return dispatch(loginSuccess(user, token));
    });
};

export const loginEffect = (email: string, password: string): Effect => async (
  dispatch,
  getState
) => {
  const {
    i18n: { t = (key: string) => key }
  } = getState();
  dispatch(loginRequest());
  return AuthService.login({ email, password })
    .then(async (res: any) => {
      if (res.status === 200) {
        let { user, Authorization } = await res.json();
        return dispatch(loginSuccess(user, Authorization));
      } else {
        let { message } = await res.json();
        dispatch(loginError(message));
      }
    })
    .catch((err: any) => {
      return dispatch(loginError(t('shared.internet_connexion_error')));
    });
};
