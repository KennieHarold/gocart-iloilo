import {CURRENT_USER_RESET_STATE, SET_CURRENT_USER} from '../actions/types';
import {USER} from './blueprints';

const initialState = {
  isUserDataFetched: false,
  user: {
    ...USER,
  },
};

const CurrentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const {payload} = action;

      return {
        ...state,
        isUserDataFetched: payload.isUserDataFetched,
        user: {
          ...payload.user,
        },
      };

    case CURRENT_USER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default CurrentUserReducer;
