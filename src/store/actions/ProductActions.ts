import { LoadProductsRequest, LOAD_PRODUCTS_REQUEST, Products, LoadProductsSuccess, LOAD_PRODUCTS_SUCCESS, LoadProductsError, LOAD_PRODUCTS_ERROR } from "store/types/ProductTypes";

export const loadProductsRequest = (): LoadProductsRequest => ({
    type: LOAD_PRODUCTS_REQUEST
});

export const loadProductsSuccess = (data: Products[]): LoadProductsSuccess => ({
    type: LOAD_PRODUCTS_SUCCESS,
    products: data
});

export const loadProductsError = (): LoadProductsError => ({
    type: LOAD_PRODUCTS_ERROR
});
