import { Action } from 'redux';
export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';

export interface User {
  name: string;
  age: number;
}

export interface LoadingUsersState {
  users: boolean;
}

export interface UsersState {
  loading: LoadingUsersState;
  users: User[];
}

export interface LoadUsersRequest extends Action {
  type: typeof LOAD_USERS_REQUEST;
}

export interface LoadUsersSuccess extends Action {
  type: typeof LOAD_USERS_SUCCESS;
  users: User[];
}

export interface LoadUsersError extends Action {
  type: typeof LOAD_USERS_ERROR;
}
