import { ThunkAction } from 'redux-thunk';
import { loadProductsRequest, loadProductsSuccess, loadProductsError } from 'store/actions';
import { ArticleService } from 'services/api';
import { ProductsState, ApplicationAction, ApplicationState } from 'store/types';





type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;
//! write documentation here for this line

export const loadProductEffects = (): Effect => async (dispatch, getState) => {
    dispatch(loadProductsRequest());

    return ArticleService.get_list_product()
        .then(async (response: any) => {

            if (response.status === 200) {

                const { data } = await response.json();
                console.log('data', data)
                dispatch(loadProductsSuccess(data.products));
            } else {
                dispatch(loadProductsError());
            }
        })
        .catch(() => dispatch(loadProductsError()));
};

export const filterEffects = (): Effect => async (dispatch, getState) => {
    dispatch(loadProductsRequest());

    return ArticleService.get_filter_success()
        .then(async (response: any) => {

            if (response.status === 200) {

                const { data } = await response.json();
                console.log('data', data)
                dispatch(loadProductsSuccess(data.products));
            } else {
                dispatch(loadProductsError());
            }
        })
        .catch(() => dispatch(loadProductsError()));
};