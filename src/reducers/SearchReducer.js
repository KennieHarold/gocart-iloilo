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
} from '../actions/types';

const initialState = {
  //  Search result lists
  searchResultProducts: [],
  searchResultStoreProducts: [],

  //  Text Inputs
  searchQuery: '',
  searchStoreQuery: '',

  //  Loaders
  isSearchResultProductsLoading: false,
  isSearchResultStoreProductsLoading: false,
};

const SearchReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case ADD_SEARCH_RESULT_PRODUCT:
      index = state.searchResultProducts.findIndex(
        product => product.id === action.product.id,
      );
      if (index === -1) {
        return {
          ...state,
          searchResultProducts: [...state.searchResultProducts, action.product],
        };
      } else {
        return state;
      }

    case CHANGE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.text,
      };

    case CHANGE_SEARCH_STORE_QUERY:
      return {
        ...state,
        searchStoreQuery: action.text,
      };

    case CHANGE_SEARCH_RESULT_PRODUCTS_LOADING:
      return {
        ...state,
        isSearchResultProductsLoading: action.payload,
      };

    case CLEAR_SEARCH_RESULT_PRODUCTS:
      return {
        ...state,
        searchResultProducts: [],
      };

    //  Loader for search result in store
    case CHANGE_SEARCH_RESULT_STORE_PRODUCTS_LOADING:
      return {
        ...state,
        isSearchResultStoreProductsLoading: action.payload,
      };

    //  Search store query
    case CHANGE_SEARCH_STORE_QUERY:
      return {
        ...state,
        searchStoreQuery: action.text,
      };

    //  Add store product to search results
    case ADD_SEARCH_RESULT_STORE_PRODUCT:
      index = state.searchResultStoreProducts.findIndex(
        product => product.id === action.product.id,
      );

      if (index === -1) {
        return {
          ...state,
          searchResultStoreProducts: [
            ...state.searchResultStoreProducts,
            action.product,
          ],
        };
      } else {
        return state;
      }

    //  Clear search result store products
    case CLEAR_SEARCH_RESULT_STORE_PRODUCTS:
      return {
        ...state,
        searchResultStoreProducts: [],
      };

    case SEARCH_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default SearchReducer;
