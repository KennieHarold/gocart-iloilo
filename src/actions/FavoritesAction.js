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
