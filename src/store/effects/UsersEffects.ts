import { ThunkAction } from 'redux-thunk';
import { UsersState, ApplicationAction } from 'store/types';
import {
  loadUsersRequest,
  loadUsersSuccess,
  loadUsersError
} from 'store/actions';
import { UsersService } from 'services/api';

type Effect = ThunkAction<any, UsersState, any, ApplicationAction>; //! write documentation here for this line

export const loadUsers = (): Effect => async (dispatch, getState) => {
  dispatch(loadUsersRequest());

  return UsersService.list_users()
    .then(async (response: any) => {
      if (response.status === 200) {
        dispatch(loadUsersSuccess(await response.json()));
      } else {
        dispatch(loadUsersError());
      }
    })
    .catch(() => dispatch(loadUsersError()));
};
