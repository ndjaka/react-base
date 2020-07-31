import {
  User,
  LoginError,
  LoginRequest,
  LoginSuccess,
  SignUpError,
  SignUpRequest,
  SignUpSuccess,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  Logout,
  LOGOUT
} from 'store/types';

export const loginRequest = (): LoginRequest => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user: User, token: string): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  user,
  token
});

export const loginError = (message: string): LoginError => ({
  type: LOGIN_FAILURE,
  message
});

export const signUpRequest = (): SignUpRequest => ({
  type: SIGNUP_REQUEST
});

export const signUpSuccess = (message: string): SignUpSuccess => ({
  type: SIGNUP_SUCCESS,
  message
});

export const signUpError = (message: string): SignUpError => ({
  type: SIGNUP_FAILURE,
  message
});
export const logout = (): Logout => ({
  type: LOGOUT
});
