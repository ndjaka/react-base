import {
  User,
  LoadUsersRequest,
  LoadUsersSuccess,
  LoadUsersError,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR
} from 'store/types';

export const loadUsersRequest = (): LoadUsersRequest => ({
  type: LOAD_USERS_REQUEST
});

export const loadUsersSuccess = (users: User[]): LoadUsersSuccess => ({
  type: LOAD_USERS_SUCCESS,
  users
});

export const loadUsersError = (): LoadUsersError => ({
  type: LOAD_USERS_ERROR
});
