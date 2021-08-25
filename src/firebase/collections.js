import firestore from '@react-native-firebase/firestore';
import {APP_ENV} from '@env';

export const userCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveUsers')
    : firestore().collection('devUsers');

export const storeCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveStores')
    : firestore().collection('devStores');

export const categoryCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveCategories')
    : firestore().collection('devCategories');

export const productCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveProducts')
    : firestore().collection('devProducts');

export const cartCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveCarts')
    : firestore().collection('devCarts');

export const bannerCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveBanners')
    : firestore().collection('devBanners');

export const orderCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveOrders')
    : firestore().collection('devOrders');

export const transactionCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveTransactions')
    : firestore().collection('devTransactions');

export const favoritesCollection =
  APP_ENV === 'production'
    ? firestore().collection('liveFavorites')
    : firestore().collection('devFavorites');

export const appConstants = firestore().collection('appConstants');
