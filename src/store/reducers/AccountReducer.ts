/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  // UPDATE_PROFILE,
  AccountState,
  ApplicationAction
} from 'store/types';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

const initialState: AccountState = {
  user: undefined,
  token: undefined,
  loading: {
    login_failed: false,
    login_failed_message: '',
    login_loading: false,
    signup_failed: false,
    signup_loading: false,
    signup_failed_message: ''
  }
};

const reducer = (state = initialState, action: ApplicationAction) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        draft.user = undefined;
        draft.token = undefined;
        draft.loading.login_loading = true;
        draft.loading.login_failed = false;
        draft.loading.login_failed_message = '';
      });
    }

    case LOGIN_SUCCESS: {
      const { user, token } = action;
      ls.set('token', token);
      ls.set('user', user);
      return produce(state, (draft) => {
        draft.user = user;
        draft.token = token;
      });
    }

    case LOGIN_FAILURE: {
      const { message } = action;

      return produce(state, (draft) => {
        draft.loading.login_failed = true;
        draft.loading.login_failed_message = message;
      });
    }

    case LOGOUT: {
      ls.remove('token');
      ls.remove('user');
      return produce(state, (draft) => {
        draft.user = undefined;
        draft.token = undefined;
      });
    }

    // case UPDATE_PROFILE: {
    //   const { user } = action.payload;

    //   return produce(state, (draft) => {
    //     draft.user = user;
    //   });
    // }

    default: {
      return state;
    }
  }
};

export default reducer;
