import {
  TEMP_USERNAME_CHANGE,
  TEMP_FIRSTNAME_CHANGE,
  TEMP_LASTNAME_CHANGE,
  PROFILE_RESET_STATE,
} from '../actions/types';

const initialState = {
  tempUsername: '',
  tempFirstName: '',
  tempLastName: '',
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMP_USERNAME_CHANGE:
      return {
        ...state,
        tempUsername: action.text,
      };

    case TEMP_FIRSTNAME_CHANGE:
      return {
        ...state,
        tempFirstName: action.text,
      };

    case TEMP_LASTNAME_CHANGE:
      return {
        ...state,
        tempLastName: action.text,
      };

    case PROFILE_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default ProfileReducer;
