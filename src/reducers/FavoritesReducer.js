import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_FAVORITES,
  FAVORITES_RESET_STATE,
} from '../actions/types';

const initialState = {
  favorites: [],
};

const FavoritesReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case ADD_FAVORITE:
      index = state.favorites.findIndex(
        product => product.id === action.product.id,
      );

      if (index === -1) {
        return {
          ...state,
          favorites: [...state.favorites, action.product],
        };
      } else {
        return state;
      }

    case REMOVE_FAVORITE:
      index = state.favorites.findIndex(
        product => product.id === action.product.id,
      );

      if (index !== -1) {
        newFavorites = [...state.favorites];
        newFavorites.splice(index, 1);

        return {
          ...state,
          favorites: newFavorites,
        };
      } else {
        return state;
      }

    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      };

    case FAVORITES_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default FavoritesReducer;
