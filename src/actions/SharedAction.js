import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import auth from '@react-native-firebase/auth';
import {errorHandler} from '../helpers';
import * as RootNavigation from '../navigation/RootNavigation';
import {GOOGLE_CLOUD_API_KEY, CLOUD_FUNCTIONS_API_URL} from '@env';
import {
  DETAILED_ADDRESS_CHANGE,
  NOTE_TO_RIDER_CHANGE,
  ADDRESS_CHANGE,
  CHANGE_FORMATTED_ADDRESS,
  CHANGE_PHONE_NUMBER,
  CHANGE_PHONE_NUMBER_VERIFIED,
  ADDRESS_RESET_STATE,
  PHONE_RESET_STATE,
  CHANGE_MAP_NEXT_ACTION,
  CHANGE_PHONE_VERIFY_NEXT_ACTION,
  CHANGE_ALLOW_RESEND,
  CHANGE_RESEND_SECONDS,
  SHARED_RESET_STATE,
} from './types';
import {showSimpleLoadingModal, showAlert} from './ModalAlertAction';
import {userCollection} from '../firebase/collections';

Geocoder.init(GOOGLE_CLOUD_API_KEY);

/*********************** Private or helper functions *********************************/

const askLocationPermission = async callback => {
  await check(
    Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    }),
  ).then(async checkResult => {
    switch (checkResult) {
      case RESULTS.GRANTED:
        callback(true);
        break;

      case RESULTS.DENIED:
        await request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          }),
        ).then(requestResult => {
          if (requestResult === RESULTS.GRANTED) {
            callback(true);
          } else {
            callback(false);
          }
        });
        break;

      case RESULTS.BLOCKED:
        callback(false);
        break;

      default:
        callback(false);
        break;
    }
  });
};

const callVerifyApi = async (phone, code, callback) => {
  const apiUrl = CLOUD_FUNCTIONS_API_URL + 'http-checkPhoneVerification';
  const token = await auth().currentUser.getIdToken();

  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
    body: JSON.stringify({
      to: phone.code + phone.number,
      code,
    }),
  })
    .then(async response => {
      if (response.status === 200) {
        const data = await response.json();
        callback(data.status);
      } else {
        errorHandler(dispatch, 'shared/phone-verify-error');
      }
    })
    .catch(error => {
      console.log(error);
      errorHandler(dispatch, 'shared/phone-verify-error');
    });
};

const checkPhoneAlreadyExists = async number => {
  const query = {
    code: '+63',
    isVerified: true,
    number,
  };
  const snapshots = await userCollection.where('phone', '==', query).get();
  return snapshots.size > 0;
};

/*********************** Dispatchers *********************************/

export const detailedAddressChange = text => {
  return {
    type: DETAILED_ADDRESS_CHANGE,
    text,
  };
};

export const noteToRiderChange = text => {
  return {
    type: NOTE_TO_RIDER_CHANGE,
    text,
  };
};

export const addressChange = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  formattedAddress,
}) => {
  const payload = {
    isAddressSet: true,
    address: {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      formattedAddress,
    },
  };

  return {
    type: ADDRESS_CHANGE,
    payload,
  };
};

export const changeFormattedAddress = text => {
  return {
    type: CHANGE_FORMATTED_ADDRESS,
    text,
  };
};

export const changePhoneNumber = phoneNumber => {
  return {
    type: CHANGE_PHONE_NUMBER,
    phoneNumber,
  };
};

export const changePhoneNumberVerified = payload => {
  return {
    type: CHANGE_PHONE_NUMBER_VERIFIED,
    payload,
  };
};

export const changeMapNextAction = nextAction => {
  return {
    type: CHANGE_MAP_NEXT_ACTION,
    nextAction,
  };
};

export const changePhoneVerifyNextAction = nextAction => {
  return {
    type: CHANGE_PHONE_VERIFY_NEXT_ACTION,
    nextAction,
  };
};

export const addressResetState = () => {
  return {
    type: ADDRESS_RESET_STATE,
  };
};

export const phoneResetState = () => {
  return {
    type: PHONE_RESET_STATE,
  };
};

export const sharedResetState = () => {
  return {
    type: SHARED_RESET_STATE,
  };
};

export const changeAllowResend = payload => {
  return {
    type: CHANGE_ALLOW_RESEND,
    payload,
  };
};

export const changeResendSeconds = seconds => {
  return {
    type: CHANGE_RESEND_SECONDS,
    seconds,
  };
};

/*********************** Public Methods *********************************/

export const geocode = (latitude, longitude, latitudeDelta, longitudeDelta) => {
  return async dispatch => {
    //dispatch(showSimpleLoadingModal(true));

    await Geocoder.from(latitude, longitude)
      .then(json => {
        const addressObj = json.results[0].formatted_address;

        const address = {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
          formattedAddress: addressObj,
        };

        dispatch(addressChange(address));
      })
      .catch(error => {
        console.log(error);

        //  Just to make sure
        dispatch(showSimpleLoadingModal(false));

        if (error.code === 2) {
          errorHandler(dispatch, 'gen/network-error');
        } else {
          errorHandler(dispatch, 'gen/default');
        }
      });

    //dispatch(showSimpleLoadingModal(false));
  };
};

export const getCurrentLocation = () => {
  return async dispatch => {
    try {
      dispatch(showSimpleLoadingModal(true));
      await askLocationPermission(callback => {
        if (callback) {
          Geolocation.getCurrentPosition(
            async position => {
              const {coords} = position;
              const {latitude, longitude} = coords;

              await Geocoder.from(latitude, longitude)
                .then(json => {
                  const addressObj = json.results[0].formatted_address;

                  const address = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                    formattedAddress: addressObj,
                  };

                  dispatch(addressChange(address));
                })
                .catch(error => {
                  console.log(error);

                  //  Just to make sure
                  dispatch(showSimpleLoadingModal(false));

                  if (error.code === 2) {
                    errorHandler(dispatch, 'gen/network-error');
                  } else {
                    errorHandler(dispatch, 'gen/default');
                  }
                });
            },
            error => {
              console.log(error.code, error.message);
              errorHandler(dispatch, 'gen/default');
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        }
      });
      dispatch(showSimpleLoadingModal(false));
    } catch (error) {
      console.log(error);
      errorHandler(dispatch, 'gen/default');
    }
  };
};

export const startPhoneVerification = phone => {
  return async (dispatch, getState) => {
    try {
      const {hasUserDocument} = getState().auth;

      let phoneRe = /9\d{9}/;

      if (!phoneRe.test(phone.number)) {
        throw new Error('wrong-format');
      }

      dispatch(showSimpleLoadingModal(true));

      const isExists = await checkPhoneAlreadyExists(phone.number);
      const token = await auth().currentUser.getIdToken();

      dispatch(showSimpleLoadingModal(false));

      if (isExists) {
        throw new Error('already-exists');
      }

      const apiUrl = CLOUD_FUNCTIONS_API_URL + 'http-startPhoneVerification';

      //console.log(token);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
        },
        body: JSON.stringify({
          phone: phone.code + phone.number,
        }),
      });

      if (response.status !== 200) {
        //  Just trigger an error
        throw new Error('');
      }

      if (hasUserDocument) {
        RootNavigation.navigate('PhoneVerify');
      } else {
        RootNavigation.navigate('NoDoc__PhoneVerify');
      }
    } catch (error) {
      console.log(error);

      if (error.message === 'wrong-format') {
        errorHandler(dispatch, 'shared/wrong-format-phone');
      } else if (error.message === 'already-exists') {
        errorHandler(dispatch, 'shared/phone-exists');
      } else {
        errorHandler(dispatch, 'shared/phone-verify-error');
      }
    }
  };
};

export const checkPhoneVerification = (phone, code, nextAction) => {
  return async dispatch => {
    dispatch(showSimpleLoadingModal(true));

    let status = undefined;

    await callVerifyApi(phone, code, callback => {
      status = callback;
    });

    if (status === 'approved') {
      dispatch(changePhoneNumberVerified(true));
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Your phone number is now verified',
          status: 'success',
          allowClose: false,
          action: nextAction,
          actionText: 'Proceed',
        }),
      );
    } else {
      dispatch(changePhoneNumberVerified(false));
      errorHandler(dispatch, 'shared/wrong-verify-code');
    }

    dispatch(showSimpleLoadingModal(false));
  };
};

export const resendVerificationTimer = seconds => {
  return dispatch => {
    let _seconds = seconds;

    dispatch(changeResendSeconds(_seconds));
    dispatch(changeAllowResend(false));

    let timer = setInterval(() => {
      _seconds = _seconds - 1;

      dispatch(changeResendSeconds(_seconds));

      if (_seconds < 1) {
        clearInterval(timer);
        dispatch(changeAllowResend(true));
      }
    }, 1000);
  };
};
