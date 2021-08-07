import firestore from '@react-native-firebase/firestore';
import {APP_ENV} from '@env';

export const userCollection =
  APP_ENV === 'production'
    ? firestore().collection('users')
    : firestore().collection('devUsers');

export const storeCollection =
  APP_ENV === 'production'
    ? firestore().collection('stores')
    : firestore().collection('devStores');

export const categoryCollection =
  APP_ENV === 'production'
    ? firestore().collection('categories')
    : firestore().collection('devCategories');

export const productCollection =
  APP_ENV === 'production'
    ? firestore().collection('products')
    : firestore().collection('devProducts');

export const cartCollection =
  APP_ENV === 'production'
    ? firestore().collection('carts')
    : firestore().collection('devCarts');

export const bannerCollection =
  APP_ENV === 'production'
    ? firestore().collection('banners')
    : firestore().collection('devBanners');

export const orderCollection =
  APP_ENV === 'production'
    ? firestore().collection('orders')
    : firestore().collection('devOrders');

export const transactionCollection =
  APP_ENV === 'production'
    ? firestore().collection('transactions')
    : firestore().collection('devTransactions');

export const favoritesCollection =
  APP_ENV === 'production'
    ? firestore().collection('favorites')
    : firestore().collection('devFavorites');

export const appConstants = firestore().collection('appConstants');
