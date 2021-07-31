import {ADD_BANNER, APP_RESET_STATE} from '../actions/types';

const initialState = {
  banners: [],
};

const AppReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case ADD_BANNER:
      index = state.banners.findIndex(banner => banner.id === action.banner.id);

      if (index === -1) {
        return {
          ...state,
          banners: [...state.banners, action.banner],
        };
      } else {
        return state;
      }

    case APP_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default AppReducer;
