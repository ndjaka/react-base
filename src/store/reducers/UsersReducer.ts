import produce from 'immer';
import {
  UsersState,
  ApplicationAction,
  LOAD_USERS_ERROR,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS
} from 'store/types';

export const initialState: UsersState = {
  loading: {
    users: false
  },
  users: []
};

const reducer = (state = initialState, action: ApplicationAction) => {
  switch (action.type) {
    case LOAD_USERS_REQUEST:
      return produce(state, (draft) => {
        draft.loading.users = true;
      });
    case LOAD_USERS_SUCCESS:
      return produce(state, (draft) => {
        draft.loading.users = false;
        draft.users = action.users;
      });
    case LOAD_USERS_ERROR:
      return produce(state, (draft) => {
        draft.loading.users = false;
      });
    default:
      return state;
  }
};

export default reducer;
