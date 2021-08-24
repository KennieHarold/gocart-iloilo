import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {customAlphabet} from 'nanoid';
import {errorHandler} from '../helpers';
import {
  cartCollection,
  orderCollection,
  productCollection,
  transactionCollection,
} from '../firebase/collections';
import * as RootNavigation from '../navigation/RootNavigation';
import {
  CART_RESET_STATE,
  SELECT_PRESSED_PRODUCT,
  INCERMENT_QTY_PRESSED_PRODUCT,
  CLEAR_PRESSED_PRODUCT,
  ADD_PRODUCT_TO_LOCAL_CART,
  CHANGE_PRODUCT_TO_LOCAL_CART,
  REMOVE_PRODUCT_TO_LOCAL_CART,
  CHANGE_IS_CART_LOADING,
  SELECT_STORE_ID_IN_CART,
  SELECT_STORE_PRODUCTS,
  CLEAR_STORE_PRODUCTS,
  CHANGE_CHECKOUT_DETAILS,
  CLEAR_CHECKOUT_DETAILS,
} from './types';
import {CART, ORDER, ADDRESS, TRANSACTION} from '../reducers/blueprints';
import {addressResetState, phoneResetState} from './SharedAction';
import {showSimpleLoadingModal} from './ModalAlertAction';

/*********************** Dispatchers *********************************/
export const selectPressedProduct = product => {
  return {
    type: SELECT_PRESSED_PRODUCT,
    payload: {
      isPressedProduct: true,
      pressedProduct: {
        product,
        qty: 1,
      },
    },
  };
};

export const incrementQtyPressedProduct = payload => {
  return {
    type: INCERMENT_QTY_PRESSED_PRODUCT,
    payload,
  };
};

export const clearPressedProduct = () => {
  return {
    type: CLEAR_PRESSED_PRODUCT,
  };
};

export const cartResetState = () => {
  return {
    type: CART_RESET_STATE,
  };
};

export const addProductToLocalCart = cartProduct => {
  return {
    type: ADD_PRODUCT_TO_LOCAL_CART,
    cartProduct,
  };
};

export const changeProductToLocalCart = cartProduct => {
  return {
    type: CHANGE_PRODUCT_TO_LOCAL_CART,
    cartProduct,
  };
};

export const removeProductToLocalCart = cartProduct => {
  return {
    type: REMOVE_PRODUCT_TO_LOCAL_CART,
    cartProduct,
  };
};

export const changeIsCartLoading = payload => {
  return {
    type: CHANGE_IS_CART_LOADING,
    payload,
  };
};

export const selectStoreIdInCart = storeId => {
  return {
    type: SELECT_STORE_ID_IN_CART,
    storeId,
  };
};

export const selectStoreProducts = storeProducts => {
  return {
    type: SELECT_STORE_PRODUCTS,
    storeProducts,
  };
};

export const clearStoreProducts = () => {
  return {
    type: CLEAR_STORE_PRODUCTS,
  };
};

export const changeCheckoutDetails = checkoutDetails => {
  return {
    type: CHANGE_CHECKOUT_DETAILS,
    checkoutDetails,
  };
};

export const clearCheckoutDetails = () => {
  return {
    type: CLEAR_CHECKOUT_DETAILS,
  };
};

/*********************** Public methods *********************************/

export const addProductToCart = ({product, qty}, selectedStore) => {
  return async dispatch => {
    const userId = auth().currentUser.uid;

    dispatch(showSimpleLoadingModal(true));

    try {
      await cartCollection
        .where('userId', '==', userId)
        .where('productId', '==', product.id)
        .where('isRemoved', '==', false)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            //  Updates quantity if product already exists in cart
            let data = snapshots.docs[0].data();
            let totalQty = data.quantity + qty;

            if (totalQty <= 20) {
              cartCollection
                .doc(data.id)
                .update({
                  quantity: totalQty,
                  dateUpdated: new Date(),
                })
                .then(() => {
                  Snackbar.show({
                    text: 'Successfully added to cart',
                    duration: Snackbar.LENGTH_LONG,
                    //backgroundColor: Colors.success,
                  });
                });
            } else {
              errorHandler(dispatch, 'cart/server-max-qty');
            }
          } else {
            //  Add document if product doesn't exists in cart
            const docId = uuidv4();
            const dataToAdd = {
              ...CART,
              id: docId,
              storeId: selectedStore.id,
              productId: product.id,
              quantity: qty,
              userId,
            };
            cartCollection
              .doc(docId)
              .set(dataToAdd)
              .then(() => {
                Snackbar.show({
                  text: 'Successfully added to cart',
                  duration: Snackbar.LENGTH_LONG,
                  //backgroundColor: Colors.success,
                });
              });
          }
        });
    } catch (error) {
      console.log(error);
      errorHandler(dispatch, 'cart/add-product-cart-fail');
    }

    dispatch(clearPressedProduct());
    dispatch(showSimpleLoadingModal(false));
  };
};

export const removeProductToCart = cartProduct => {
  return async dispatch => {
    dispatch(showSimpleLoadingModal(true));

    await cartCollection.doc(cartProduct.id).delete();

    dispatch(showSimpleLoadingModal(false));

    Snackbar.show({
      text: 'Successfully removed from cart',
      duration: Snackbar.LENGTH_LONG,
    });
  };
};

export const getUserCartProducts = () => {
  return dispatch => {
    const userId = auth().currentUser.uid;

    cartCollection
      .where('userId', '==', userId)
      .where('isRemoved', '==', false)
      //.orderBy('dateCreated')
      .onSnapshot(snapshot => {
        dispatch(changeIsCartLoading(true));

        let docChangesSize = snapshot ? snapshot.docChanges().length : 0;

        if (docChangesSize > 0) {
          snapshot.docChanges().forEach(async (change, index) => {
            const data = change.doc.data();

            if (change.type === 'added') {
              const product = await productCollection.doc(data.productId).get();
              dispatch(
                addProductToLocalCart({
                  ...data,
                  product: product.data(),
                }),
              );
            }
            if (change.type === 'modified') {
              dispatch(changeProductToLocalCart(data));
            }
            if (change.type === 'removed') {
              dispatch(removeProductToLocalCart(data));
            }

            //  Verify if all documents are iterated then stop the loader
            if (docChangesSize === index + 1) {
              dispatch(changeIsCartLoading(false));
            }
          });
        } else {
          dispatch(changeIsCartLoading(false));
        }
      });
  };
};

export const incrementQtyPressedProductValidator = _qty => {
  return (dispatch, getState) => {
    const {
      pressedProduct: {qty},
    } = getState().cart;

    if (_qty === 1) {
      if (qty < 20) {
        dispatch(incrementQtyPressedProduct(_qty));
      } else {
        dispatch(incrementQtyPressedProduct(0));
        errorHandler(dispatch, 'cart/max-qty');
      }
    } else if (_qty === -1) {
      if (qty > 1) {
        dispatch(incrementQtyPressedProduct(_qty));
      } else {
        dispatch(incrementQtyPressedProduct(0));
      }
    } else {
      throw new Error(`Qty: ${_qty} is not accepted`);
    }
  };
};

export const incrementQtyCartProduct = (cartProduct, _qty) => {
  return async (dispatch, getState) => {
    const {cart} = getState().cart;

    dispatch(showSimpleLoadingModal(true));

    let index = cart.findIndex(item => item.id === cartProduct.id);

    if (index !== -1) {
      let qty = cart[index].quantity;

      if (_qty === 1) {
        if (qty < 20) {
          await cartCollection
            .doc(cartProduct.id)
            .update({quantity: firestore.FieldValue.increment(_qty)});
        } else {
          errorHandler(dispatch, 'cart/max-qty');
        }
      } else if (_qty === -1) {
        if (qty > 1) {
          await cartCollection
            .doc(cartProduct.id)
            .update({quantity: firestore.FieldValue.increment(_qty)});
        }
      } else {
        throw new Error(`Qty: ${_qty} is not accepted`);
      }
    } else {
      throw new Error(`CartProductId: ${_qty} not found`);
    }

    dispatch(showSimpleLoadingModal(false));
  };
};

export const navigateCheckout = (storeProducts, subTotal) => {
  return (dispatch, getState) => {
    const {
      user: {phone},
    } = getState().currentUser;

    if (phone.isVerified) {
      dispatch(selectStoreProducts(storeProducts));
      dispatch(changeCheckoutDetails({subTotal}));

      RootNavigation.navigate('Checkout');
    } else {
      dispatch(
        showAlert({
          isDisplayed: true,
          text: 'Please verify your phone number first',
          status: 'error',
        }),
      );
    }
  };
};

export const checkout = (
  checkoutDetails,
  selectedStoreProducts,
  shoppingFee,
  deliveryFee,
  totalPayment,
) => {
  return async dispatch => {
    try {
      if (
        checkoutDetails.deliverySchedule[0] === undefined &&
        checkoutDetails.deliverySchedule[1] === undefined
      ) {
        throw new Error('delivery-schedule-missing');
      }

      const orderId = uuidv4();

      const nanoid = customAlphabet('1234567890', 8);
      const randomLetters = nanoid();
      const reference = 'GCI-' + randomLetters;

      const transactionId = uuidv4();
      const userId = auth().currentUser.uid;

      const items = selectedStoreProducts.products.map(item => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      const cart = selectedStoreProducts.products.map(item => item.id);

      const orderData = {
        ...ORDER,
        id: orderId,
        dateCreated: new Date(),
        reference,
        transactionId: transactionId,
        userId,
        storeId: selectedStoreProducts.storeId,
        items,
        deliverySchedule: checkoutDetails.deliverySchedule,
        notes: checkoutDetails.notes,
        contact: {
          ...checkoutDetails.contact,
        },
        deliveryAddress: {
          ...ADDRESS,
          ...checkoutDetails.deliveryAddress,
        },
      };

      const transactionData = {
        ...TRANSACTION,
        id: transactionId,
        transactionDate: new Date(),
        paymentDetails: {
          ...TRANSACTION.paymentDetails,
          method: checkoutDetails.paymentMethod,
          shoppingFee,
          deliveryFee,
          subTotal: checkoutDetails.subTotal,
          totalPayment,
        },
      };

      dispatch(showSimpleLoadingModal(true));

      const orderRef = orderCollection.doc(orderId).set(orderData);

      const transactionRef = transactionCollection
        .doc(transactionId)
        .set(transactionData);

      //  Create an order and transaction documents
      await Promise.all([orderRef, transactionRef]);

      //  Remove items from cart
      cart.forEach(item => cartCollection.doc(item).delete());

      //  Clear checkout details state
      dispatch(clearCheckoutDetails());

      RootNavigation.navigate('OrderConfirmation');

      dispatch(showSimpleLoadingModal(false));

      //  End of try block
    } catch (error) {
      console.log(error);

      //  Just to make sure that the loader is stopped after an error
      dispatch(showSimpleLoadingModal(false));

      if (error.message === 'delivery-schedule-missing') {
        errorHandler(dispatch, 'cart/checkout-delivery-schedule-missing');
      } else {
        errorHandler(dispatch, 'gen/default');
      }
    }
  };
};

export const changeDeliveryAddressFromShared = () => {
  return (dispatch, getState) => {
    const {address, isAddressSet} = getState().shared;

    if (isAddressSet && address.formattedAddress !== '') {
      dispatch(
        changeCheckoutDetails({
          deliveryAddress: {
            latitude: address.latitude,
            longitude: address.longitude,
            formattedAddress: address.formattedAddress,
            detailedAddress: address.detailedAddress,
            noteToRider: address.noteToRider,
          },
        }),
      );
      dispatch(addressResetState());
      RootNavigation.navigate('Checkout');
    } else {
      errorHandler(dispatch, 'shared/missing-address');
    }
  };
};

export const changePhoneFromShared = () => {
  return (dispatch, getState) => {
    const {phone} = getState().shared;

    if (phone.isVerified && phone.number !== '') {
      dispatch(
        changeCheckoutDetails({
          contact: {
            code: '+63',
            number: phone.number,
          },
        }),
      );
      dispatch(phoneResetState());

      RootNavigation.navigate('Checkout');
    } else {
      console.log('Heeere');
      errorHandler(dispatch, 'gen/default');
    }
  };
};
