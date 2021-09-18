import firestore from '@react-native-firebase/firestore';
import {APP_ENV} from '@env';

const appEnv = APP_ENV;

//console.log('Env: ', appEnv);

export const userCollection =
  appEnv === 'production'
    ? firestore().collection('liveUsers')
    : firestore().collection('devUsers');

export const storeCollection =
  appEnv === 'production'
    ? firestore().collection('liveStores')
    : firestore().collection('devStores');

export const categoryCollection =
  appEnv === 'production'
    ? firestore().collection('liveCategories')
    : firestore().collection('devCategories');

export const productCollection =
  appEnv === 'production'
    ? firestore().collection('liveProducts')
    : firestore().collection('devProducts');

export const cartCollection =
  appEnv === 'production'
    ? firestore().collection('liveCarts')
    : firestore().collection('devCarts');

export const bannerCollection =
  appEnv === 'production'
    ? firestore().collection('liveBanners')
    : firestore().collection('devBanners');

export const orderCollection =
  appEnv === 'production'
    ? firestore().collection('liveOrders')
    : firestore().collection('devOrders');

export const transactionCollection =
  appEnv === 'production'
    ? firestore().collection('liveTransactions')
    : firestore().collection('devTransactions');

export const favoritesCollection =
  appEnv === 'production'
    ? firestore().collection('liveFavorites')
    : firestore().collection('devFavorites');

export const appConstants = firestore().collection('appConstants');
