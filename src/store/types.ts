import {
  UsersState,
  LoadUsersRequest,
  LoadUsersSuccess,
  LoadUsersError
} from './types/UsersTypes';

import {
  AccountState,
  LoginRequest,
  LoginError,
  LoginSuccess,
  SignUpError,
  SignUpRequest,
  SignUpSuccess,
  Logout
} from './types/AccountTypes';

import {
  ChangeLanguage,
  InternationalisationState,
  SetTranslatorFunction
} from './types/InternationalisationTypes';
import { LoadProductsRequest, LoadProductsSuccess, LoadProductsError, ProductsState, addFavSuccess } from './types/ProductTypes';

export * from './types/UsersTypes';
export * from './types/InternationalisationTypes';
export * from './types/AccountTypes';
export * from './types/ProductTypes';

export interface ApplicationState {
  users: UsersState;
  i18n: InternationalisationState;
  account: AccountState;
  products: ProductsState;
}

export type ApplicationAction =
  | LoadUsersRequest
  | LoadUsersSuccess
  | LoadUsersError
  | ChangeLanguage
  | LoginError
  | LoginRequest
  | LoginSuccess
  | SignUpError
  | SignUpRequest
  | SignUpSuccess
  | Logout
  | SetTranslatorFunction
  | LoadProductsRequest
  | LoadProductsSuccess
  | addFavSuccess
  | LoadProductsError;
