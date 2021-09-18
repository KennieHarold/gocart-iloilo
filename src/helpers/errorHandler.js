import Snackbar from 'react-native-snackbar';
import {ModalAlertAction} from '../actions';
import * as RootNavigation from '../navigation/RootNavigation';

const {showAlert} = ModalAlertAction;

const errorHandler = (dispatch, errorCode) => {
  switch (errorCode) {
    /****************** Auth Error *******************/
    case 'auth/email-already-in-use':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'It seems you already registered in our app',
          actionText: 'LOGIN HERE',
          action: () => RootNavigation.navigate('Login'),
          status: 'info',
        }),
      );
      return;

    case 'auth/account-exists-with-different-credential':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'It seems you have an existing account with different credential',
          status: 'info',
        }),
      );
      return;

    case 'auth/problem-sending-email':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'There is a problem sending your email. Please try again',
          status: 'error',
        }),
      );
      return;

    case 'auth/weak-password':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Your password should be at least 6 characters',
          status: 'error',
        }),
      );
      return;

    case 'auth/user-not-found':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'It seems you are not registered in our app',
          actionText: 'SIGNUP HERE',
          action: () => RootNavigation.navigate('Signup'),
          status: 'info',
        }),
      );
      return;

    case 'auth/passwords-doesnt-match':
      Snackbar.show({
        text: "Your passwords doesn't match",
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    case 'auth/signout-error':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'There is a problem signing out',
          status: 'error',
        }),
      );
      return;

    case 'auth/wrong-password':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'You enter a wrong password',
          status: 'error',
        }),
      );
      return;

    case 'auth/cancelled':
      Snackbar.show({
        text: 'User cancelled the signing process',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    case 'auth/network-request-failed':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Please check your internet connection',
          status: 'error',
        }),
      );
      return;

    /****************** Profile Error *******************/
    case 'profile/username-exists':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Your username is already exist. Please try another one',
          status: 'error',
        }),
      );
      return;

    case 'profile/user-update-failed':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'There is an error updating your profile',
          status: 'error',
        }),
      );
      return;

    /****************** Shared Error *******************/
    case 'shared/missing-address':
      Snackbar.show({
        text: 'Please set your delivery address',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    case 'shared/phone-verify-error':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'There is an error processing your verification. Please try again.',
          status: 'error',
        }),
      );
      return;

    case 'shared/phone-exists':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Your phone number is already exist. Please try another one',
          status: 'error',
        }),
      );
      return;

    case 'shared/wrong-verify-code':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'You enter a wrong verification code',
          status: 'error',
        }),
      );
      return;

    case 'shared/wrong-format-phone':
      Snackbar.show({
        text: 'Your phone number is not in the right format',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    case 'shared/location-out-coverage':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Your location is not supported by the app. Please choose a location within Iloilo City',
          status: 'error',
        }),
      );
      return;

    /****************** Cart Error *******************/
    case 'cart/max-qty':
      Snackbar.show({
        text: 'Only 20 items per product is allowed',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    case 'cart/server-max-qty':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Only 20 items per product is allowed',
          status: 'error',
        }),
      );
      return;

    case 'cart/add-product-cart-fail':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'There is an error adding your product to cart. Please try again later',
          status: 'error',
        }),
      );
      return;

    case 'cart/checkout-delivery-schedule-missing':
      Snackbar.show({
        text: 'Delivery schedule is missing',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    /****************** Favorites Error *******************/
    case "favorites/can't-add":
      Snackbar.show({
        text: 'Failed to add favorite',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    case "favorites/can't-remove":
      Snackbar.show({
        text: 'Failed to remove favorite',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    /****************** Default Error *******************/
    case 'gen/network-error':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Please check your internet connection.',
          status: 'error',
        }),
      );
      return;

    case 'gen/missing-fields':
      Snackbar.show({
        text: 'Please fill in the fields provided',
        duration: Snackbar.LENGTH_LONG,
      });
      return;

    case 'gen/app-url-not-supported':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'App URL not supported',
          status: 'error',
        }),
      );
      return;

    case 'gen/default':
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'There is an error happened. Please try again later',
          status: 'error',
        }),
      );
      return;

    default:
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'There is an error happened. Please try again later',
          status: 'error',
        }),
      );
      return;
  }
};

export default errorHandler;
