import * as RootNavigation from '../navigation/RootNavigation';
import {
  FLOOR_UNIT_ROOM_NUMBER_CHANGE,
  NOTE_TO_RIDER_CHANGE,
  ADDRESS_CHANGE,
  CHANGE_FORMATTED_ADDRESS,
  CHANGE_PHONE_NUMBER,
  CHANGE_PHONE_NUMBER_VERIFIED,
  CHANGE_PHONE_VERIFY_NEXT_ACTION,
  CHANGE_MAP_NEXT_ACTION,
  ADDRESS_RESET_STATE,
  PHONE_RESET_STATE,
  SHARED_RESET_STATE,
  CHANGE_ALLOW_RESEND,
  CHANGE_RESEND_SECONDS,
} from '../actions/types';
import {ADDRESS} from './blueprints';

const initialState = {
  //  Phone
  allowResend: true,
  resendSeconds: 0,
  phone: {
    code: '+63',
    isVerified: false,
    number: '',
  },
  phoneVerifyNextAction: () => RootNavigation.navigate('CreateProfile'),

  //  Address
  isAddressSet: false,
  address: {
    ...ADDRESS,
    latitude: 10.72402089984486,
    longitude: 122.55733011290431,
    formattedAddress: '',
  },
  mapNextAction: () => {},
};

const SharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLOOR_UNIT_ROOM_NUMBER_CHANGE:
      return {
        ...state,
        address: {
          ...state.address,
          detailedAddress: action.text,
        },
      };

    case NOTE_TO_RIDER_CHANGE:
      return {
        ...state,
        address: {
          ...state.address,
          noteToRider: action.text,
        },
      };

    case ADDRESS_CHANGE:
      return {
        ...state,
        isAddressSet: action.payload.isAddressSet,
        address: {
          ...state.address,
          ...action.payload.address,
        },
      };

    case CHANGE_FORMATTED_ADDRESS:
      return {
        ...state,
        address: {
          ...state.address,
          formattedAddress: action.text,
        },
      };

    case CHANGE_PHONE_NUMBER:
      return {
        ...state,
        phone: {
          ...state.phone,
          number: action.phoneNumber,
        },
      };

    case CHANGE_PHONE_NUMBER_VERIFIED:
      return {
        ...state,
        phone: {
          ...state.phone,
          isVerified: action.payload,
        },
      };

    case CHANGE_PHONE_VERIFY_NEXT_ACTION:
      return {
        ...state,
        phoneVerifyNextAction: action.nextAction,
      };

    case CHANGE_MAP_NEXT_ACTION:
      return {
        ...state,
        mapNextAction: action.nextAction,
      };

    case CHANGE_ALLOW_RESEND:
      return {
        ...state,
        allowResend: action.payload,
      };

    case CHANGE_RESEND_SECONDS:
      return {
        ...state,
        resendSeconds: action.seconds,
      };

    case ADDRESS_RESET_STATE:
      return {
        ...state,
        isAddressSet: false,
        address: initialState.address,
        mapNextAction: () => {},
      };

    case PHONE_RESET_STATE:
      return {
        ...state,
        phone: initialState.phone,
        phoneVerifyNextAction: () => {},
      };

    case SHARED_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default SharedReducer;
