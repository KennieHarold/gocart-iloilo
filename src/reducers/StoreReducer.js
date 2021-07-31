import {
  STORE_RESET_STATE,
  ADD_AVAILABLE_STORE,
  SELECT_STORE,
  CHANGE_AVAILABLE_STORES_LOADING,
  ADD_SELECTED_STORE_CATEGORIES,
  CHANGE_SELECTED_STORE_CATEGORIES_LOADING,
  CLEAR_SELECTED_STORE_CATEGORIES,
  ADD_SELECTED_STORE_CATEGORIZED_PRODUCTS,
  CHANGE_CATEGORIZED_PRODUCTS_LOADING,
  SELECT_CATEGORY,
  ADD_SINGLE_CATEGORY_PRODUCT,
  CLEAR_SINGLE_CATEGORY_PRODUCTS,
  CHANGE_SINGLE_CATEGORY_PRODUCTS_LOADING,
  CHANGE_MORE_PRODUCTS_LOADING,
  CLEAR_SELECTED_STORE_CATEGORIZED_PRODUCTS,
} from '../actions/types';

const initialState = {
  //  List of stores available in the database
  availableStores: [],

  //  Selected store
  selectedStore: {},

  //  List of categories of the selected store
  selectedStoreCategories: [],

  //  List of categorized products of the selected store
  selectedStoreCategorizedProducts: [],

  //  Selected category for screen view
  selectedCategory: {},

  //  List of products with the same categories
  singleCategoryProducts: [],

  //  Loaders
  isCategorizedProductsLoading: false,
  isSelectedStoreCategoriesLoading: false,
  isAvailableStoresLoading: false,
  isSingleCategoryProductsLoading: false,
  isMoreProductsLoading: false,
};

const StoreReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    //  Add store to the available store list
    case ADD_AVAILABLE_STORE:
      index = state.availableStores.findIndex(
        store => store.id === action.store.id,
      );
      if (index === -1) {
        return {
          ...state,
          availableStores: [...state.availableStores, action.store],
        };
      } else {
        return state;
      }

    //  Add categories of the selected store to the list
    case ADD_SELECTED_STORE_CATEGORIES:
      index = state.selectedStoreCategories.findIndex(
        category => category.id === action.category.id,
      );
      if (index === -1) {
        return {
          ...state,
          selectedStoreCategories: [
            ...state.selectedStoreCategories,
            action.category,
          ],
        };
      } else {
        return state;
      }

    /** Add categorized products of the selected store to the list
     *
     *  selectedStoreCategorizedProducts (key list)
     *    - id: string
     *    - category: object
     *    - product: object
     */
    case ADD_SELECTED_STORE_CATEGORIZED_PRODUCTS:
      index = state.selectedStoreCategorizedProducts.findIndex(
        products => products.id === action.products.id,
      );

      if (index === -1) {
        return {
          ...state,
          selectedStoreCategorizedProducts: [
            ...state.selectedStoreCategorizedProducts,
            action.products,
          ],
        };
      } else {
        return state;
      }

    //  Toggle loading for categorized products
    case CHANGE_CATEGORIZED_PRODUCTS_LOADING:
      return {
        ...state,
        isCategorizedProductsLoading: action.payload,
      };

    //  Toggle loading for available stores
    case CHANGE_AVAILABLE_STORES_LOADING:
      return {
        ...state,
        isAvailableStoresLoading: action.payload,
      };

    //  Toggle loading for categories
    case CHANGE_SELECTED_STORE_CATEGORIES_LOADING:
      return {
        ...state,
        isSelectedStoreCategoriesLoading: action.payload,
      };

    //  Clear categories state
    case CLEAR_SELECTED_STORE_CATEGORIES: {
      return {
        ...state,
        selectedStoreCategories: [],
      };
    }

    //  Clear categorized products
    case CLEAR_SELECTED_STORE_CATEGORIZED_PRODUCTS:
      return {
        ...state,
        selectedStoreCategorizedProducts: [],
      };

    //  Select store
    case SELECT_STORE:
      return {
        ...state,
        selectedStore: action.store,
      };

    //  Select category
    case SELECT_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.category,
      };
    }

    //  Add product to single category product list
    case ADD_SINGLE_CATEGORY_PRODUCT: {
      index = state.singleCategoryProducts.findIndex(
        product => product.id === action.product.id,
      );

      if (index === -1) {
        return {
          ...state,
          singleCategoryProducts: [
            ...state.singleCategoryProducts,
            action.product,
          ],
        };
      } else {
        return state;
      }
    }

    //  Clear single category product list
    case CLEAR_SINGLE_CATEGORY_PRODUCTS:
      return {
        ...state,
        singleCategoryProducts: [],
      };

    //  Toggle loading for single category products
    case CHANGE_SINGLE_CATEGORY_PRODUCTS_LOADING:
      return {
        ...state,
        isSingleCategoryProductsLoading: action.payload,
      };

    //  Toggle more products loading
    case CHANGE_MORE_PRODUCTS_LOADING:
      return {
        ...state,
        isMoreProductsLoading: action.payload,
      };

    //  Reset state
    case STORE_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default StoreReducer;
