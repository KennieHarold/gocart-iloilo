import {
  ADD_PROCESSING_ORDER,
  ADD_CANCELLED_ORDER,
  ADD_DELIVERED_ORDER,
  REMOVE_PROCESSING_ORDER,
  REMOVE_CANCELLED_ORDER,
  REMOVE_DELIVERED_ORDER,
  CHANGE_PROCESSING_ORDERS_LOADING,
  CHANGE_CANCELLED_ORDERS_LOADING,
  CHANGE_DELIVERED_ORDERS_LOADING,
  CHANGE_MORE_PROCESSING_ORDERS_LOADING,
  CHANGE_MORE_CANCELLED_ORDERS_LOADING,
  CHANGE_MORE_DELIVERED_ORDERS_LOADING,
  CLEAR_PROCESSING_ORDERS,
  CLEAR_CANCELLED_ORDERS,
  CLEAR_DELIVERED_ORDERS,
  SELECT_ORDER,
  SELECT_ORDER_ITEMS,
  CLEAR_ORDER_ITEMS,
  CLEAR_ORDER,
  ORDER_RESET_STATE,
} from '../actions/types';

const initialState = {
  selectedOrder: {},
  selectedOrderItems: [],

  //  Orders list by status
  processingOrders: [],
  cancelledOrders: [],
  deliveredOrders: [],

  //  Loaders
  isProcessingOrdersLoading: false,
  isCancelledOrdersLoading: false,
  isDeliveredOrdersLoading: false,

  //  More Loader
  isMoreProcessingOrdersLoading: false,
  isMoreCancelledOrdersLoading: false,
  isMoreDeliveredOrdersLoading: false,
};

const OrderReducer = (state = initialState, action) => {
  let index = undefined;
  let newOrder = undefined;

  switch (action.type) {
    case ADD_PROCESSING_ORDER:
      index = state.processingOrders.findIndex(
        order => order.id === action.order.id,
      );

      if (index === -1) {
        return {
          ...state,
          processingOrders: [...state.processingOrders, action.order],
        };
      } else {
        return state;
      }

    case ADD_CANCELLED_ORDER:
      index = state.cancelledOrders.findIndex(
        order => order.id === action.order.id,
      );

      if (index === -1) {
        return {
          ...state,
          cancelledOrders: [...state.cancelledOrders, action.order],
        };
      } else {
        return state;
      }

    case ADD_DELIVERED_ORDER:
      index = state.deliveredOrders.findIndex(
        order => order.id === action.order.id,
      );

      if (index === -1) {
        return {
          ...state,
          deliveredOrders: [...state.deliveredOrders, action.order],
        };
      } else {
        return state;
      }

    case REMOVE_PROCESSING_ORDER:
      index = state.processingOrders.findIndex(
        order => order.id === action.order.id,
      );

      if (index !== -1) {
        newOrder = [...state.order];
        newOrder.splice(index, 1);

        return {
          ...state,
          processingOrders: newOrder,
        };
      } else {
        return state;
      }

    case REMOVE_CANCELLED_ORDER:
      index = state.cancelledOrders.findIndex(
        order => order.id === action.order.id,
      );

      if (index !== -1) {
        newOrder = [...state.order];
        newOrder.splice(index, 1);

        return {
          ...state,
          cancelledOrders: newOrder,
        };
      } else {
        return state;
      }

    case REMOVE_DELIVERED_ORDER:
      index = state.deliveredOrders.findIndex(
        order => order.id === action.order.id,
      );

      if (index !== -1) {
        newOrder = [...state.order];
        newOrder.splice(index, 1);

        return {
          ...state,
          deliveredOrders: newOrder,
        };
      } else {
        return state;
      }

    case CHANGE_PROCESSING_ORDERS_LOADING:
      return {
        ...state,
        isProcessingOrdersLoading: action.payload,
      };

    case CHANGE_CANCELLED_ORDERS_LOADING:
      return {
        ...state,
        isCancelledOrdersLoading: action.payload,
      };

    case CHANGE_DELIVERED_ORDERS_LOADING:
      return {
        ...state,
        isDeliveredOrdersLoading: action.payload,
      };

    case CHANGE_MORE_PROCESSING_ORDERS_LOADING:
      return {
        ...state,
        isMoreProcessingOrdersLoading: action.payload,
      };

    case CHANGE_MORE_CANCELLED_ORDERS_LOADING:
      return {
        ...state,
        isMoreCancelledOrdersLoading: action.payload,
      };

    case CHANGE_MORE_DELIVERED_ORDERS_LOADING:
      return {
        ...state,
        isMoreDeliveredOrdersLoading: action.payload,
      };

    case CLEAR_PROCESSING_ORDERS:
      return {
        ...state,
        processingOrders: [],
      };

    case CLEAR_CANCELLED_ORDERS:
      return {
        ...state,
        cancelledOrders: [],
      };

    case CLEAR_DELIVERED_ORDERS:
      return {
        ...state,
        deliveredOrders: [],
      };

    case SELECT_ORDER:
      return {
        ...state,
        selectedOrder: action.order,
      };

    case SELECT_ORDER_ITEMS:
      return {
        ...state,
        selectedOrderItems: action.orderItems,
      };

    case CLEAR_ORDER_ITEMS:
      return {
        ...state,
        selectedOrderItems: [],
      };

    case CLEAR_ORDER:
      return {
        ...state,
        selectedOrder: {},
      };

    case ORDER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default OrderReducer;
