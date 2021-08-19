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
} from '../actions/types';
import {ADDRESS, PAYMENT_METHOD} from './blueprints';

const initialState = {
  //  Cart
  selectedStoreId: '',
  selectedStoreProducts: {},
  isPressedProduct: false,
  pressedProduct: {
    product: {},
    qty: 0,
  },
  isCartLoading: false,
  cart: [],

  //  Checkout
  checkoutDetails: {
    subTotal: 0,
    deliverySchedule: [undefined, undefined],
    paymentMethod: PAYMENT_METHOD[0],
    deliveryAddress: {
      ...ADDRESS,
    },
    contact: {
      code: '+63',
      number: '',
    },
  },
};

const CartReducer = (state = initialState, action) => {
  let index = undefined;
  let newCart = undefined;
  let newCartProduct = undefined;

  switch (action.type) {
    case SELECT_PRESSED_PRODUCT:
      return {
        ...state,
        isPressedProduct: action.payload.isPressedProduct,
        pressedProduct: {
          product: action.payload.pressedProduct.product,
          qty: action.payload.pressedProduct.qty,
        },
      };

    case INCERMENT_QTY_PRESSED_PRODUCT:
      return {
        ...state,
        pressedProduct: {
          ...state.pressedProduct,
          qty: state.pressedProduct.qty + action.payload,
        },
      };

    case ADD_PRODUCT_TO_LOCAL_CART:
      index = state.cart.findIndex(
        cartProduct => cartProduct.id === action.cartProduct.id,
      );

      if (index === -1) {
        return {
          ...state,
          cart: [...state.cart, action.cartProduct],
        };
      } else {
        return state;
      }

    case CHANGE_PRODUCT_TO_LOCAL_CART:
      index = state.cart.findIndex(
        cartProduct => cartProduct.id === action.cartProduct.id,
      );

      if (index !== -1) {
        newCart = [...state.cart];
        newCartProduct = state.cart[index];
        newCartProduct.quantity = action.cartProduct.quantity;

        newCart.splice(index, 1, newCartProduct);

        return {
          ...state,
          cart: newCart,
        };
      } else {
        return state;
      }

    case REMOVE_PRODUCT_TO_LOCAL_CART:
      index = state.cart.findIndex(
        cartProduct => cartProduct.id === action.cartProduct.id,
      );

      if (index !== -1) {
        newCart = [...state.cart];
        newCart.splice(index, 1);

        return {
          ...state,
          cart: newCart,
        };
      } else {
        return state;
      }

    case CHANGE_IS_CART_LOADING:
      return {
        ...state,
        isCartLoading: action.payload,
      };

    case CLEAR_PRESSED_PRODUCT:
      return {
        ...state,
        isPressedProduct: false,
        pressedProduct: {
          product: {},
          qty: 0,
        },
      };

    case SELECT_STORE_ID_IN_CART:
      return {
        ...state,
        selectedStoreId: action.storeId,
      };

    case SELECT_STORE_PRODUCTS:
      return {
        ...state,
        selectedStoreProducts: action.storeProducts,
      };

    case CLEAR_STORE_PRODUCTS:
      return {
        ...state,
        selectedStoreProducts: {},
      };

    case CHANGE_CHECKOUT_DETAILS:
      return {
        ...state,
        checkoutDetails: {
          ...state.checkoutDetails,
          ...action.checkoutDetails,
        },
      };

    case CART_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default CartReducer;
