import {
  SHOW_LOADING_MODAL,
  SHOW_ALERT,
  SHOW_SIMPLE_LOADING_MODAL,
} from './types';

export const showLoadingModal = payload => {
  return {
    type: SHOW_LOADING_MODAL,
    payload,
  };
};

export const showSimpleLoadingModal = payload => {
  return {
    type: SHOW_SIMPLE_LOADING_MODAL,
    payload,
  };
};

export const showAlert = payload => {
  return {
    type: SHOW_ALERT,
    payload,
  };
};
