import auth from '@react-native-firebase/auth';
import {ADDRESS, USER} from '../reducers/blueprints';
import {userCollection} from '../firebase/collections';
import * as RootNavigation from '../navigation/RootNavigation';
import {hdifyPP, errorHandler} from '../helpers';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  TEMP_USERNAME_CHANGE,
  TEMP_FIRSTNAME_CHANGE,
  TEMP_LASTNAME_CHANGE,
  PROFILE_RESET_STATE,
} from './types';
import {showLoadingModal, showSimpleLoadingModal} from './ModalAlertAction';
import {phoneResetState, sharedResetState} from './SharedAction';
import {hasUserDocumentChange} from './AuthAction';

/*********************** Private or helper functions *********************************/

const addUserDataToFireStore = async (dispatch, data) => {
  await userCollection
    .doc(data.id)
    .set(data)
    .then(() => {
      dispatch(hasUserDocumentChange(true));
      dispatch(profileResetState());
      dispatch(sharedResetState());
    })
    .catch(error => {
      console.log(error);
      errorHandler(dispatch, error.code);
    });
};

const checkUserNameExists = async (dispatch, username) => {
  const uid = auth().currentUser.uid;
  const isExists = await userCollection
    .where('id', '!=', uid)
    .where('username', '==', username)
    .get()
    .then(snapshots => {
      if (snapshots.size > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
      errorHandler(dispatch, error.code);
    });

  return isExists;
};

/*********************** Dispatchers *********************************/

export const tempUsernameChange = text => {
  return {
    type: TEMP_USERNAME_CHANGE,
    text,
  };
};

export const tempFirstNameChange = text => {
  return {
    type: TEMP_FIRSTNAME_CHANGE,
    text,
  };
};

export const tempLastNameChange = text => {
  return {
    type: TEMP_LASTNAME_CHANGE,
    text,
  };
};

export const profileResetState = () => {
  return {
    type: PROFILE_RESET_STATE,
  };
};

/*********************** Public Methods *********************************/

export const createUserProfile = createProfileParams => {
  return async dispatch => {
    const {
      username,
      firstName,
      lastName,
      address,
      phone,
      isAddressSet,
      provider,
      providerEmail,
      providerUID,
      providerPhotoURL,
      isEmailVerified,
    } = createProfileParams;

    if (
      username.trim() !== '' &&
      firstName.trim() !== '' &&
      lastName.trim() !== ''
    ) {
      if (isAddressSet) {
        const {
          latitude,
          longitude,
          formattedAddress,
          floorUnitRoomNumber,
          noteToRider,
        } = address;

        const addressId = uuidv4();

        const data = {
          ...USER,
          id: providerUID,
          username: username.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone,
          provider,
          email: providerEmail,
          photoUrl: hdifyPP(providerPhotoURL, provider),
          isEmailVerified,
          address: [
            {
              ...ADDRESS,
              id: addressId,
              latitude,
              longitude,
              formattedAddress,
              floorUnitRoomNumber: floorUnitRoomNumber.trim(),
              noteToRider: noteToRider.trim(),
            },
          ],
        };
        dispatch(showLoadingModal({isLoading: true, text: 'Processing...'}));

        const isExist = await checkUserNameExists(dispatch, username);

        if (!isExist) {
          await addUserDataToFireStore(dispatch, data);
        } else {
          errorHandler(dispatch, 'profile/username-exists');
        }
        dispatch(showLoadingModal({isLoading: false}));
      } else {
        errorHandler(dispatch, 'shared/missing-address');
      }
    } else {
      errorHandler(dispatch, 'gen/missing-fields');
    }
  };
};

export const updateProfile = profileParams => {
  return async dispatch => {
    const uid = auth().currentUser.uid;

    dispatch(showLoadingModal({isLoading: true, text: 'Updating...'}));

    const isExist = await checkUserNameExists(dispatch, profileParams.username);

    if (!isExist) {
      await userCollection
        .doc(uid)
        .update({
          ...profileParams,
        })
        .then(() => {
          RootNavigation.navigate('Profile');
        })
        .catch(error => {
          console.log(error);
          errorHandler(dispatch, 'profile/user-update-failed');
        });
    } else {
      errorHandler(dispatch, 'profile/username-exists');
    }

    dispatch(showLoadingModal({isLoading: false}));
  };
};

export const updatePhone = () => {
  return async (dispatch, getState) => {
    const {phone} = getState().shared;
    const uid = auth().currentUser.uid;

    if (phone.number !== '') {
      dispatch(showSimpleLoadingModal(true));

      await userCollection
        .doc(uid)
        .update({phone})
        .then(() => {
          dispatch(phoneResetState());
          RootNavigation.navigate('EditProfile');
        })
        .catch(error => {
          console.log(error);
          errorHandler(dispatch, 'profile/user-update-failed');
        });

      dispatch(showSimpleLoadingModal(false));
    } else {
      errorHandler(dispatch, 'gen/default');
    }
  };
};
