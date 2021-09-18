import {
  AUTH_SUCCESS,
  AUTH_LOADING_CHANGE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  CONFIRM_PASSWORD_CHANGE,
  AUTH_RESET_STATE,
  HAS_USER_DOCUMENT_CHANGE,
  SETTINGS_PASS_CHANGE,
  SETTINGS_CONFIRM_PASS_CHANGE,
  SETTINGS_NEW_PASS_CHANGE,
} from '../actions/types';

const initialState = {
  isAuthLoading: true,
  email: '',
  password: '',
  confirmPassword: '',
  isAuthenticated: false,
  hasUserDocument: false,
  provider: '',
  providerEmail: '',
  providerUID: '',
  providerPhotoURL: '',
  isEmailVerified: false,

  //  For change password inputs
  settingsPass: '',
  settingsConfirmPass: '',
  settingsNewPass: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case AUTH_LOADING_CHANGE:
      return {
        ...state,
        isAuthLoading: action.payload,
      };

    case EMAIL_CHANGE:
      return {
        ...state,
        email: action.text,
      };

    case PASSWORD_CHANGE:
      return {
        ...state,
        password: action.text,
      };

    case CONFIRM_PASSWORD_CHANGE:
      return {
        ...state,
        confirmPassword: action.text,
      };

    case HAS_USER_DOCUMENT_CHANGE:
      return {
        ...state,
        hasUserDocument: action.payload,
      };

    case SETTINGS_PASS_CHANGE:
      return {
        ...state,
        settingsPass: action.text,
      };

    case SETTINGS_CONFIRM_PASS_CHANGE:
      return {
        ...state,
        settingsConfirmPass: action.text,
      };

    case SETTINGS_NEW_PASS_CHANGE:
      return {
        ...state,
        settingsNewPass: action.text,
      };

    case AUTH_RESET_STATE:
      return {
        ...initialState,
        isAuthLoading: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
