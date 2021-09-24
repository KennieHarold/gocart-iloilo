import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth, {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '@env';
import {errorHandler} from '../helpers';
import {userCollection} from '../firebase/collections';
import * as RootNavigation from '../navigation/RootNavigation';
import {
  AUTH_SUCCESS,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  CONFIRM_PASSWORD_CHANGE,
  AUTH_RESET_STATE,
  HAS_USER_DOCUMENT_CHANGE,
  AUTH_LOADING_CHANGE,
  SETTINGS_PASS_CHANGE,
  SETTINGS_CONFIRM_PASS_CHANGE,
  SETTINGS_NEW_PASS_CHANGE,
  RESET_EMAIL_CHANGE,
} from './types';
import {
  showLoadingModal,
  showAlert,
  showSimpleLoadingModal,
} from './ModalAlertAction';
import {currentUserResetState} from './CurrentUserAction';
import {profileResetState} from './ProfileAction';
import {storeResetState} from './StoreAction';
import {cartResetState} from './CartAction';
import {sharedResetState} from './SharedAction';
import {orderResetState} from './OrderAction';
import {searchResetState} from './SearchAction';
import {favoritesResetState} from './FavoritesAction';

/************************ Private or helper functions **********************************/

const getFacebookCredential = async dispatch => {
  try {
    //LoginManager.setLoginBehavior('WEB_ONLY');

    //  Make sure everything is clean
    LoginManager.logOut();

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('cancelled');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('general');
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return credential;
  } catch (error) {
    console.log(error);
    if (error.message === 'cancelled') {
      errorHandler(dispatch, 'auth/cancelled');
    } else {
      errorHandler(dispatch, 'gen/default');
    }
  }
};

const getGoogleCredential = async dispatch => {
  try {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.email'],
      webClientId: WEB_CLIENT_ID,
    });
    const {accessToken, idToken} = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );
    return credential;
  } catch (error) {
    console.log(error);
    errorHandler(dispatch, 'auth/general');
  }
};

const checkUidExistsInDB = async id => {
  const response = await userCollection.doc(id).get();
  return response._exists;
};

const checkCreateProfileOrLogin = async (dispatch, authObject, uid) => {
  try {
    const uidExists = await checkUidExistsInDB(uid);

    if (uidExists) {
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          ...authObject,
          hasUserDocument: true,
        },
      });
    } else {
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          ...authObject,
          hasUserDocument: false,
        },
      });
    }
  } catch (error) {
    console.log(error);
    errorHandler(dispatch, 'gen/default');
  }
};

const signInWithCredential = async (dispatch, credential) => {
  dispatch(showLoadingModal({isLoading: true}));

  await auth()
    .signInWithCredential(credential)
    .then(async response => {
      const uid = response.user.uid;
      const authObject = {
        isAuthenticated: true,
        providerUID: uid,
        providerEmail: response.user.email,
        provider: response.additionalUserInfo.providerId,
        providerPhotoURL: response.user.photoURL,
        isEmailVerified: true,
      };
      checkCreateProfileOrLogin(dispatch, authObject, uid);
    })
    .catch(error => {
      console.log(error);
      errorHandler(dispatch, error.code);
    });

  dispatch(showLoadingModal({isLoading: false}));
};

const sendEmailVerification = dispatch => {
  const user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(() => {
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'We have sent an email with a verification link to your email address. Please verify your email before logging in',
          actionText: 'LOGIN NOW',
          action: () => RootNavigation.navigate('Onboarding'),
          status: 'info',
        }),
      );
      signOut();
    })
    .catch(error => {
      console.log(error);
      errorHandler(dispatch, 'auth/problem-sending-email');
    });
};

/************************ Dispatchers **********************************/

export const emailChange = text => {
  return {
    type: EMAIL_CHANGE,
    text,
  };
};

export const resetEmailChange = text => {
  return {
    type: RESET_EMAIL_CHANGE,
    text,
  };
};

export const passwordChange = text => {
  return {
    type: PASSWORD_CHANGE,
    text,
  };
};

export const confirmPasswordChange = text => {
  return {
    type: CONFIRM_PASSWORD_CHANGE,
    text,
  };
};

export const hasUserDocumentChange = payload => {
  return {
    type: HAS_USER_DOCUMENT_CHANGE,
    payload,
  };
};

export const authResetState = () => {
  return {
    type: AUTH_RESET_STATE,
  };
};

export const authLoadingChange = payload => {
  return {
    type: AUTH_LOADING_CHANGE,
    payload,
  };
};

export const settingsPassChange = text => {
  return {
    type: SETTINGS_PASS_CHANGE,
    text,
  };
};

export const settingsNewPassChange = text => {
  return {
    type: SETTINGS_NEW_PASS_CHANGE,
    text,
  };
};

export const settingsConfirmPassChange = text => {
  return {
    type: SETTINGS_CONFIRM_PASS_CHANGE,
    text,
  };
};

/************************ Public functions **********************************/

export const signInWithFacebook = () => {
  return async dispatch => {
    const credential = await getFacebookCredential(dispatch);

    if (credential !== undefined) {
      signInWithCredential(dispatch, credential);
    }
  };
};

export const signInWithGoogle = () => {
  return async dispatch => {
    const credential = await getGoogleCredential(dispatch);

    if (credential !== undefined) {
      signInWithCredential(dispatch, credential);
    }
  };
};

export const signUpWithEmailAndPassword = (
  email,
  password,
  confirmPassword,
) => {
  return async dispatch => {
    dispatch(showLoadingModal({isLoading: true}));

    if (email !== '' && password !== '') {
      if (password === confirmPassword) {
        await auth()
          .createUserWithEmailAndPassword(email.trim(), password)
          .then(() => sendEmailVerification(dispatch))
          .catch(error => {
            console.log(error);
            errorHandler(dispatch, error.code);
          });
      } else {
        errorHandler(dispatch, 'auth/passwords-doesnt-match');
      }
    } else {
      errorHandler(dispatch, 'gen/missing-fields');
    }
    dispatch(showLoadingModal({isLoading: false}));
  };
};

export const signInWithEmailAndPassword = (email, password) => {
  return async dispatch => {
    dispatch(showLoadingModal({isLoading: true}));

    if (email !== '' && password !== '') {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(async response => {
          console.log(response);
          const uid = response.user.uid;

          const isEmailVerified = response.user.emailVerified;

          const authObject = {
            isAuthenticated: true,
            hasCollection: false,
            providerUID: uid,
            providerEmail: response.user.email,
            provider: 'password',
            providerPhotoURL: response.user.photoURL,
            isEmailVerified,
          };

          if (isEmailVerified) {
            checkCreateProfileOrLogin(dispatch, authObject, uid);
          } else {
            sendEmailVerification(dispatch);
          }
        })
        .catch(error => {
          console.log(error);
          errorHandler(dispatch, error.code);
        });
    } else {
      errorHandler(dispatch, 'gen/missing-fields');
    }
    dispatch(showLoadingModal({isLoading: false}));
  };
};

export const checkUserLoggedIn = () => {
  return dispatch => {
    auth().onAuthStateChanged(async user => {
      if (user) {
        const uid = user.uid;

        const isEmailVerified =
          user.providerData[0].providerId === 'password'
            ? user.emailVerified
            : true;

        const authObject = {
          isAuthLoading: false,
          isAuthenticated: true,
          providerUID: uid,
          providerEmail: user.email,
          provider: user.providerData[0].providerId,
          providerPhotoURL: user.photoURL,
          isEmailVerified,
        };

        if (isEmailVerified) {
          checkCreateProfileOrLogin(dispatch, authObject, uid);
        } else {
          dispatch(authLoadingChange(false));
        }
      } else {
        dispatch(authLoadingChange(false));
      }
    });
  };
};

export const changePassword = (password, newPassword, confirmPassword) => {
  return async dispatch => {
    dispatch(showSimpleLoadingModal(true));

    try {
      if (password && newPassword && password !== '' && newPassword !== '') {
        const user = auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password,
        );

        if (newPassword === confirmPassword) {
          await user.reauthenticateWithCredential(credential);
          await user.updatePassword(newPassword);

          dispatch(
            showAlert({
              isDisplayed: true,
              text: 'Your password was successfully updated',
              status: 'success',
            }),
          );

          RootNavigation.navigate('Profile');
        } else {
          errorHandler(dispatch, 'auth/passwords-doesnt-match');
        }
      } else {
        errorHandler(dispatch, 'gen/missing-fields');
      }
    } catch (error) {
      console.log(error);
      errorHandler(dispatch, error.code);
    }

    dispatch(showSimpleLoadingModal(false));
  };
};

export const resetPassword = email => {
  return async dispatch => {
    dispatch(showSimpleLoadingModal(true));

    try {
      if (email !== '') {
        const provider = await auth().fetchSignInMethodsForEmail(email.trim());

        if (provider[0] === 'password') {
          await auth().sendPasswordResetEmail(email.trim());

          //  Success sent reset email
          dispatch(
            showAlert({
              isDisplayed: true,
              text: 'We successfully sent a reset email to your email address. Please check your inbox',
              actionText: 'LOGIN NOW',
              action: () => RootNavigation.navigate('Onboarding'),
              status: 'success',
            }),
          );
        } else {
          errorHandler(dispatch, 'auth/reset-password-not-allow');
        }
      } else {
        errorHandler(dispatch, 'gen/missing-fields');
      }
    } catch (error) {
      console.log(error);
      errorHandler(dispatch, error.code);
    }

    dispatch(showSimpleLoadingModal(false));
  };
};

export const signOut = () => {
  return async dispatch => {
    dispatch(showLoadingModal({isLoading: true, text: 'Signing Out...'}));
    await auth()
      .signOut()
      .then(() => {
        //  Clear all states
        dispatch(authResetState());
        dispatch(profileResetState());
        dispatch(currentUserResetState());
        dispatch(storeResetState());
        dispatch(cartResetState());
        dispatch(sharedResetState());
        dispatch(orderResetState());
        dispatch(searchResetState());
        dispatch(favoritesResetState());

        if (Object.entries(GoogleSignin).length > 0) {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
        }

        if (Object.entries(LoginManager).length > 0) {
          LoginManager.logOut();
        }
      })
      .catch(error => {
        console.log(error);
        errorHandler(dispatch, 'auth/signout-error');
      });

    dispatch(showLoadingModal({isLoading: false}));
  };
};
