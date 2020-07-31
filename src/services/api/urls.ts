import config from 'config';

/* export const prefixer = config.api_url; */
export const prefixer = 'https://my-json-server.typicode.com/aero-frontend/test-task/';

export const AuthUrls = {
  LOGINUSER: `${prefixer}auth/login`,
  SIGNUP: `${prefixer}auth/register`,
  RESET_PASSWORD: `${prefixer}auth/reset-password`,
  CONFIRM_RESET_PASSWORD: `${prefixer}auth/confirm-reset-password`
};

export const UserUrls = {
  UPDATE_PROFILE: `${prefixer}users/update`,
  GET_LOGGED_USER: `${prefixer}users/get_logged_user`,
  LIST_USERS: `${prefixer}users`
};

export const article = {
  PRODUCTS_SUCCESS: `${prefixer}PRODUCTS_SUCCESS`,
  FAVORITE_FAIL: `${prefixer}FAVORITE_FAIL`,
  FAVORITE_SUCCESS: `${prefixer}/FAVORITE_SUCCESS`,
  FILTER_SUCCESS: `${prefixer}FILTER_SUCCESS`,
  FILTER_FAIL: `${prefixer}FILTER_FAIL`,

};

