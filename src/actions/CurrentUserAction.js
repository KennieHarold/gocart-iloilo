import {CURRENT_USER_RESET_STATE} from './types';
import auth from '@react-native-firebase/auth';
import {userCollection} from '../firebase/collections';
import {SET_CURRENT_USER} from './types';

/*********************** Public Methods *********************************/

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      isUserDataFetched: true,
      user,
    },
  };
};

export const currentUserResetState = () => {
  return {
    type: CURRENT_USER_RESET_STATE,
  };
};

export const getCurrentUserData = () => {
  return dispatch => {
    try {
      const uid = auth().currentUser.uid;

      userCollection.where('id', '==', uid).onSnapshot(snapshot => {
        if (snapshot) {
          snapshot.docChanges().forEach(change => {
            const data = change.doc.data();

            if (change.type === 'added' || change.type === 'modified') {
              dispatch(setCurrentUser(data));
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};
