import {
  SHOW_LOADING_MODAL,
  SHOW_ALERT,
  SHOW_SIMPLE_LOADING_MODAL,
} from '../actions/types';

const initialState = {
  showLoadingProps: {
    isLoading: false,
    text: 'Loading...',
  },
  showAlertProps: {
    isDisplayed: false,
    text: '',
    actiontext: '',
    status: '',
    allowClose: true,
    action: () => {},
  },
  showSimpleLoadingModal: false,
};

const ModalAlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING_MODAL:
      return {
        ...state,
        showLoadingProps: {
          ...state.showLoadingProps,
          ...action.payload,
          text:
            action.payload.text !== undefined && action.payload.text !== ''
              ? action.payload.text
              : 'Loading...',
        },
      };

    case SHOW_SIMPLE_LOADING_MODAL:
      return {
        ...state,
        showSimpleLoadingModal: action.payload,
      };

    case SHOW_ALERT:
      return {
        ...state,
        showAlertProps: {
          ...state.showAlertProps,
          ...action.payload,
          allowClose:
            action.payload.allowClose !== undefined
              ? action.payload.allowClose
              : true,
          actionText:
            action.payload.actionText !== undefined &&
            action.payload.actionText !== ''
              ? action.payload.actionText
              : '',
          action:
            action.payload.action !== undefined
              ? action.payload.action
              : () => {},
        },
      };

    default:
      return state;
  }
};

export default ModalAlertReducer;
