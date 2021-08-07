import auth from '@react-native-firebase/auth';
import 'react-native-get-random-values';
import {errorHandler} from '../helpers';
import {v4 as uuidv4} from 'uuid';
import {favoritesCollection, productCollection} from '../firebase/collections';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_FAVORITES,
  FAVORITES_RESET_STATE,
} from './types';

export const addFavorite = product => {
  return {
    type: ADD_FAVORITE,
    product,
  };
};

export const removeFavorite = product => {
  return {
    type: REMOVE_FAVORITE,
    product,
  };
};

export const clearFavorites = () => {
  return {
    type: CLEAR_FAVORITES,
  };
};

export const favoritesResetState = () => {
  return {
    type: FAVORITES_RESET_STATE,
  };
};

/*********************** Public Methods *********************************/

export const getFavorites = () => {
  return async dispatch => {
    const userId = auth().currentUser.uid;

    const favSnapshots = await favoritesCollection
      .where('userId', '==', userId)
      .get();

    if (favSnapshots.size > 0) {
      for (const favDoc of favSnapshots.docs) {
        let favDocData = favDoc.data();

        const productSnapshot = await productCollection
          .doc(favDocData.productId)
          .get();

        dispatch(addFavorite(productSnapshot.data()));
      }
    }
  };
};

export const toggleFavorites = (product, isFavorite) => {
  return dispatch => {
    const userId = auth().currentUser.uid;

    if (isFavorite) {
      dispatch(removeFavorite(product));

      favoritesCollection
        .where('userId', '==', userId)
        .where('productId', '==', product.id)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            let data = snapshots.docs[0].data();

            favoritesCollection
              .doc(data.id)
              .delete()
              .catch(error => {
                console.log(error);
                dispatch(addFavorite(product));
                errorHandler(dispatch, "favorites/can't-remove");
              });
          }
        });
    } else {
      dispatch(addFavorite(product));

      const docId = uuidv4();

      favoritesCollection
        .doc(docId)
        .set({
          id: docId,
          userId,
          productId: product.id,
          dateCreated: new Date(),
        })
        .catch(error => {
          console.log(error);
          dispatch(removeFavorite(product));
          errorHandler(dispatch, "favorites/can't-add");
        });
    }
  };
};
