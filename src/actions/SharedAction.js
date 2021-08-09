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

export const addressChange = ({latitude, longitude, formattedAddress}) => {
  const payload = {
    isAddressSet: true,
    address: {
      latitude,
      longitude,
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

              Geocoder.init(GOOGLE_CLOUD_API_KEY);

              await Geocoder.from(latitude, longitude)
                .then(json => {
                  const addressObj = json.results[0].address_components[0];

                  const address = {
                    latitude,
                    longitude,
                    formattedAddress: addressObj.long_name,
                  };

                  dispatch(addressChange(address));
                })
                .catch(error => {
                  console.log(error);

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
    const {hasUserDocument} = getState().auth;

    let phoneRe = /9\d{9}/;

    if (phoneRe.test(phone.number)) {
      const apiUrl = CLOUD_FUNCTIONS_API_URL + 'http-startPhoneVerification';
      const token = await auth().currentUser.getIdToken();

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
        },
        body: JSON.stringify({
          phone: phone.code + phone.number,
        }),
      })
        .then(response => {
          if (response.status !== 200) {
            errorHandler(dispatch, 'shared/phone-verify-error');
          }
        })
        .catch(error => {
          console.log(error);
          errorHandler(dispatch, 'shared/phone-verify-error');
        });

      if (hasUserDocument) {
        RootNavigation.navigate('PhoneVerify');
      } else {
        RootNavigation.navigate('NoDoc__PhoneVerify');
      }
    } else {
      errorHandler(dispatch, 'shared/wrong-format-phone');
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
