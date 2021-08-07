import {
  searchProductsByProductName,
  searchStoreProductsByProductName,
} from '../services/elasticSearch';
import {
  ADD_SEARCH_RESULT_PRODUCT,
  CHANGE_SEARCH_QUERY,
  CHANGE_SEARCH_RESULT_PRODUCTS_LOADING,
  CLEAR_SEARCH_RESULT_PRODUCTS,
  SEARCH_RESET_STATE,
  CHANGE_SEARCH_RESULT_STORE_PRODUCTS_LOADING,
  ADD_SEARCH_RESULT_STORE_PRODUCT,
  CLEAR_SEARCH_RESULT_STORE_PRODUCTS,
  CHANGE_SEARCH_STORE_QUERY,
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

export const changeSearchResultStoreProductsLoading = payload => {
  return {
    type: CHANGE_SEARCH_RESULT_STORE_PRODUCTS_LOADING,
    payload,
  };
};

export const addSearchResultStoreProduct = product => {
  return {
    type: ADD_SEARCH_RESULT_STORE_PRODUCT,
    product,
  };
};

export const clearSearchResultStoreProducts = () => {
  return {
    type: CLEAR_SEARCH_RESULT_STORE_PRODUCTS,
  };
};

export const changeSearchStoreQuery = text => {
  return {
    type: CHANGE_SEARCH_STORE_QUERY,
    text,
  };
};

/*********************** Public methods *********************************/

export const searchProducts = query => {
  return async dispatch => {
    dispatch(clearSearchResultProducts());
    dispatch(changeSearchResultProductsLoading(true));

    const products = await searchProductsByProductName(query);

    //  Use foreach to add the products one by one
    products.forEach(product => {
      dispatch(addSearchResultProduct(product));
    });

    dispatch(changeSearchQuery(''));
    dispatch(changeSearchResultProductsLoading(false));
  };
};

export const searchStoreProducts = (query, storeId) => {
  return async dispatch => {
    dispatch(clearSearchResultStoreProducts());
    dispatch(changeSearchResultStoreProductsLoading(true));

    const products = await searchStoreProductsByProductName(query, storeId);

    //  Use foreach to add the products one by one
    products.forEach(product => {
      dispatch(addSearchResultStoreProduct(product));
    });

    dispatch(changeSearchResultStoreProductsLoading(false));
  };
};
