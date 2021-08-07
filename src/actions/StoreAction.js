import * as RootNavigation from '../navigation/RootNavigation';
import {
  storeCollection,
  categoryCollection,
  productCollection,
} from '../firebase/collections';
import {errorHandler} from '../helpers';
import {
  ADD_AVAILABLE_STORE,
  ADD_SELECTED_STORE_CATEGORIES,
  CHANGE_AVAILABLE_STORES_LOADING,
  CHANGE_SELECTED_STORE_CATEGORIES_LOADING,
  CHANGE_CATEGORIZED_PRODUCTS_LOADING,
  CLEAR_SELECTED_STORE_CATEGORIES,
  SELECT_STORE,
  STORE_RESET_STATE,
  ADD_SELECTED_STORE_CATEGORIZED_PRODUCTS,
  SELECT_CATEGORY,
  ADD_SINGLE_CATEGORY_PRODUCT,
  CLEAR_SINGLE_CATEGORY_PRODUCTS,
  CHANGE_SINGLE_CATEGORY_PRODUCTS_LOADING,
  CHANGE_MORE_PRODUCTS_LOADING,
  CLEAR_SELECTED_STORE_CATEGORIZED_PRODUCTS,
} from './types';

/************************ Dispatchers **********************************/

export const selectStore = store => {
  return {
    type: SELECT_STORE,
    store,
  };
};

export const addAvailableStore = store => {
  return {
    type: ADD_AVAILABLE_STORE,
    store,
  };
};

export const storeResetState = () => {
  return {
    type: STORE_RESET_STATE,
  };
};

export const changeAvailableStoresLoading = payload => {
  return {
    type: CHANGE_AVAILABLE_STORES_LOADING,
    payload,
  };
};

export const addSelectedStoreCategories = category => {
  return {
    type: ADD_SELECTED_STORE_CATEGORIES,
    category,
  };
};

export const addSelectedStoreCategorizedProducts = products => {
  return {
    type: ADD_SELECTED_STORE_CATEGORIZED_PRODUCTS,
    products,
  };
};

export const clearSelectedStoreCategories = () => {
  return {
    type: CLEAR_SELECTED_STORE_CATEGORIES,
  };
};

export const changeCategorizedProductsLoading = payload => {
  return {
    type: CHANGE_CATEGORIZED_PRODUCTS_LOADING,
    payload,
  };
};

export const changeSelectedStoreCategoriesLoading = payload => {
  return {
    type: CHANGE_SELECTED_STORE_CATEGORIES_LOADING,
    payload,
  };
};

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    category,
  };
};

export const addSingleCategoryProduct = product => {
  return {
    type: ADD_SINGLE_CATEGORY_PRODUCT,
    product,
  };
};

export const clearSingleCategoryProducts = () => {
  return {
    type: CLEAR_SINGLE_CATEGORY_PRODUCTS,
  };
};

export const changeSingleCategoryProductsLoading = payload => {
  return {
    type: CHANGE_SINGLE_CATEGORY_PRODUCTS_LOADING,
    payload,
  };
};

export const changeMoreProductsLoading = payload => {
  return {
    type: CHANGE_MORE_PRODUCTS_LOADING,
    payload,
  };
};

export const clearSelectedStoreCategorizedProducts = () => {
  return {
    type: CLEAR_SELECTED_STORE_CATEGORIZED_PRODUCTS,
  };
};

/************************ Public functions **********************************/

export const navigateStore = store => {
  return dispatch => {
    dispatch(selectStore(store));
    RootNavigation.navigate('Store');
  };
};

export const getProductsByCategoryList = (categories, selectedStore) => {
  return async dispatch => {
    dispatch(changeCategorizedProductsLoading(true));

    try {
      await Promise.all(
        categories.map(async category => {
          const snapshots = await productCollection
            .where('storeId', '==', selectedStore.id)
            .where('categoryId', '==', category.id)
            .limit(10)
            .get();

          if (snapshots.size > 0) {
            let products = [];
            snapshots.docs.forEach(doc => {
              let data = doc.data();
              products.push(data);
            });
            dispatch(
              addSelectedStoreCategorizedProducts({
                id: `categorizedProducts-${category.id}`,
                category,
                products,
              }),
            );
          }
        }),
      );
    } catch (error) {
      console.log(error);
      errorHandler(dispatch, 'gen/default');
    }

    dispatch(changeCategorizedProductsLoading(false));
  };
};

export const getStoreCategories = store => {
  return async dispatch => {
    dispatch(changeSelectedStoreCategoriesLoading(true));

    await categoryCollection
      .where('storeId', '==', store.id)
      .where('isDeleted', '==', false)
      .get()
      .then(snapshots => {
        if (snapshots.size > 0) {
          snapshots.docs.forEach(doc => {
            let data = doc.data();
            dispatch(addSelectedStoreCategories(data));
          });
        } else {
          dispatch(clearSelectedStoreCategories());
        }
      });

    dispatch(changeSelectedStoreCategoriesLoading(false));
  };
};

export const getAvailableStoresData = () => {
  return async dispatch => {
    dispatch(changeAvailableStoresLoading(true));

    await storeCollection
      .where('isDeleted', '==', false)
      .get()
      .then(snapshots => {
        snapshots.docs.forEach(doc => {
          let data = doc.data();
          dispatch(addAvailableStore(data));
        });
      });

    dispatch(changeAvailableStoresLoading(false));
  };
};

export const navigateSingleCategoryProductsScreen = category => {
  return dispatch => {
    dispatch(selectCategory(category));
    RootNavigation.navigate('SingleCategoryProducts');
  };
};

export const getSingleCategoryProducts = category => {
  return async (dispatch, getState) => {
    const {singleCategoryProducts} = getState().store;

    if (singleCategoryProducts.length > 0) {
      dispatch(changeMoreProductsLoading(true));

      //  Trigger load more
      try {
        const lastIndex = singleCategoryProducts.length - 1;
        const lastProductData = singleCategoryProducts[lastIndex];

        const snapshots = await productCollection
          .where('categoryId', '==', category.id)
          .orderBy('id')
          .startAfter(lastProductData.id)
          .limit(10)
          .get();

        if (snapshots.size > 0) {
          snapshots.docs.forEach(doc => {
            let data = doc.data();
            dispatch(addSingleCategoryProduct(data));
          });
        }
      } catch (error) {
        console.log(error);
        errorHandler(dispatch, 'gen/default');
      }

      dispatch(changeMoreProductsLoading(false));
    } else {
      dispatch(changeSingleCategoryProductsLoading(true));

      //  Initial products fetch
      try {
        const snapshots = await productCollection
          .where('categoryId', '==', category.id)
          .orderBy('id')
          .limit(10)
          .get();

        if (snapshots.size > 0) {
          snapshots.docs.forEach(doc => {
            let data = doc.data();
            dispatch(addSingleCategoryProduct(data));
          });
        }
      } catch (error) {
        console.log(error);
        errorHandler(dispatch, 'gen/default');
      }

      dispatch(changeSingleCategoryProductsLoading(false));
    }
  };
};
