import {bannerCollection} from '../firebase/collections';
import {ADD_BANNER} from './types';

export const addBanner = banner => {
  return {
    type: ADD_BANNER,
    banner,
  };
};

export const loadBanners = () => {
  return dispatch => {
    bannerCollection
      .orderBy('orderNum')
      .get()
      .then(snapshots => {
        if (snapshots.size > 0) {
          snapshots.docs.forEach(doc => {
            let data = doc.data();
            dispatch(addBanner(data));
          });
        }
      });
  };
};
