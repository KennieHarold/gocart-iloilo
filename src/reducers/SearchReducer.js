import {
  ADD_SEARCH_RESULT_PRODUCT,
  CHANGE_SEARCH_QUERY,
  CHANGE_SEARCH_RESULT_PRODUCTS_LOADING,
  CLEAR_SEARCH_RESULT_PRODUCTS,
  SEARCH_RESET_STATE,
} from '../actions/types';

const initialState = {
  searchResultProducts: [],
  searchQuery: '',
  isSearchResultProductsLoading: false,
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

    case SEARCH_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default SearchReducer;
