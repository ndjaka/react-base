import { combineReducers, Reducer } from 'redux';
import InternationalisationReducer from './reducers/InternationalisationReducer';
import UsersReducer from './reducers/UsersReducer';
import AccountReducer from './reducers/AccountReducer';
import productsReducer from './reducers/ProductsReducer';
import { ApplicationState } from './types';

const rootReducer: Reducer<ApplicationState> = combineReducers<
  ApplicationState
>({
  i18n: InternationalisationReducer,
  users: UsersReducer,
  account: AccountReducer,
  products: productsReducer
});

export default rootReducer;
