import { Action } from 'redux';
import { User } from 'store/types';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const LOGOUT = 'LOGOUT';

export interface LoadingAccountState {
  login_loading: boolean;
  login_failed: boolean;
  login_failed_message: string;
  signup_loading: boolean;
  signup_failed: boolean;
  signup_failed_message: string;
}

export interface AccountState {
  loading: LoadingAccountState;
  token?: string;
  user?: User;
}

export interface LoginRequest extends Action {
  type: typeof LOGIN_REQUEST;
}

export interface LoginSuccess extends Action {
  type: typeof LOGIN_SUCCESS;
  token: string;
  user: User;
}

export interface LoginError extends Action {
  type: typeof LOGIN_FAILURE;
  message: string;
}

export interface SignUpRequest extends Action {
  type: typeof SIGNUP_REQUEST;
}

export interface SignUpSuccess extends Action {
  type: typeof SIGNUP_SUCCESS;
  message: string;
}

export interface SignUpError extends Action {
  type: typeof SIGNUP_FAILURE;
  message: string;
}

export interface Logout extends Action {
  type: typeof LOGOUT;
}
