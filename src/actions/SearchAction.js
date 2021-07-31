import {searchProductsByQueryString} from '../services/elasticSearch';
import {
  ADD_SEARCH_RESULT_PRODUCT,
  CHANGE_SEARCH_QUERY,
  CHANGE_SEARCH_RESULT_PRODUCTS_LOADING,
  CLEAR_SEARCH_RESULT_PRODUCTS,
  SEARCH_RESET_STATE,
} from './types';

/*********************** Dispatchers *********************************/

export const addSearchResultProduct = product => {
  return {
    type: ADD_SEARCH_RESULT_PRODUCT,
    product,
  };
};

export const changeSearchQuery = text => {
  return {
    type: CHANGE_SEARCH_QUERY,
    text,
  };
};

export const changeSearchResultProductsLoading = payload => {
  return {
    type: CHANGE_SEARCH_RESULT_PRODUCTS_LOADING,
    payload,
  };
};

export const clearSearchResultProducts = () => {
  return {
    type: CLEAR_SEARCH_RESULT_PRODUCTS,
  };
};

export const searchResetState = () => {
  return {
    type: SEARCH_RESET_STATE,
  };
};

/*********************** Public methods *********************************/

export const searchProducts = query => {
  return async dispatch => {
    dispatch(clearSearchResultProducts());
    dispatch(changeSearchResultProductsLoading(true));

    const products = await searchProductsByQueryString(query);

    //  Use foreach to add the products one by one
    products.forEach(product => {
      dispatch(addSearchResultProduct(product));
    });

    dispatch(changeSearchQuery(''));
    dispatch(changeSearchResultProductsLoading(false));
  };
};
