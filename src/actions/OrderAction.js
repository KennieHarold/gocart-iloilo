import auth from '@react-native-firebase/auth';
import {orderCollection} from '../firebase/collections';
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
  SELECT_ORDER,
  SELECT_ORDER_ITEMS,
  CLEAR_ORDER_ITEMS,
  CLEAR_ORDER,
  ORDER_RESET_STATE,
  CLEAR_PROCESSING_ORDERS,
  CLEAR_CANCELLED_ORDERS,
  CLEAR_DELIVERED_ORDERS,
} from './types';
import * as RootNavigation from '../navigation/RootNavigation';
import {errorHandler} from '../helpers';
import {showSimpleLoadingModal} from './ModalAlertAction';

/************************ Dispatchers **********************************/

export const addProcessingOrder = order => {
  return {
    type: ADD_PROCESSING_ORDER,
    order,
  };
};

export const addCancelledOrder = order => {
  return {
    type: ADD_CANCELLED_ORDER,
    order,
  };
};

export const addDeliveredOrder = order => {
  return {
    type: ADD_DELIVERED_ORDER,
    order,
  };
};

export const removeProcessingOrder = order => {
  return {
    type: REMOVE_PROCESSING_ORDER,
    order,
  };
};

export const removeCancelledOrder = order => {
  return {
    type: REMOVE_CANCELLED_ORDER,
    order,
  };
};

export const removeDeliveredOrder = order => {
  return {
    type: REMOVE_DELIVERED_ORDER,
    order,
  };
};

export const changeProcessingOrdersLoading = payload => {
  return {
    type: CHANGE_PROCESSING_ORDERS_LOADING,
    payload,
  };
};

export const changeCancelledOrdersLoading = payload => {
  return {
    type: CHANGE_CANCELLED_ORDERS_LOADING,
    payload,
  };
};

export const changeDeliveredOrdersLoading = payload => {
  return {
    type: CHANGE_DELIVERED_ORDERS_LOADING,
    payload,
  };
};

export const changeMoreProcessingOrdersLoading = payload => {
  return {
    type: CHANGE_MORE_PROCESSING_ORDERS_LOADING,
    payload,
  };
};

export const changeMoreCancelledOrdersLoading = payload => {
  return {
    type: CHANGE_MORE_CANCELLED_ORDERS_LOADING,
    payload,
  };
};

export const changeMoreDeliveredOrdersLoading = payload => {
  return {
    type: CHANGE_MORE_DELIVERED_ORDERS_LOADING,
    payload,
  };
};

export const clearProcessingOrders = () => {
  return {
    type: CLEAR_PROCESSING_ORDERS,
  };
};

export const clearCancelledOrders = () => {
  return {
    type: CLEAR_CANCELLED_ORDERS,
  };
};

export const clearDeliveredOrders = () => {
  return {
    type: CLEAR_DELIVERED_ORDERS,
  };
};

export const selectOrder = order => {
  return {
    type: SELECT_ORDER,
    order,
  };
};

export const selectOrderItems = orderItems => {
  return {
    type: SELECT_ORDER_ITEMS,
    orderItems,
  };
};

export const clearOrderItems = () => {
  return {
    type: CLEAR_ORDER_ITEMS,
  };
};

export const clearOrder = order => {
  return {
    type: CLEAR_ORDER,
    order,
  };
};

export const orderResetState = () => {
  return {
    type: ORDER_RESET_STATE,
  };
};

/************************ Public methods **********************************/

export const getProcessingOrders = () => {
  return async (dispatch, getState) => {
    const {processingOrders} = getState().order;

    const userId = auth().currentUser.uid;

    if (processingOrders.length > 0) {
      dispatch(changeMoreProcessingOrdersLoading(true));

      const lastOrderData = processingOrders[processingOrders.length - 1];

      //  Trigger load more
      await orderCollection
        .where('userId', '==', userId)
        .where('status', '==', 'processing')
        .orderBy('dateCreated', 'desc')
        .startAfter(lastOrderData.dateCreated)
        .limit(10)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            snapshots.docs.forEach(doc => {
              let data = doc.data();
              dispatch(addProcessingOrder(data));
            });
          }
        })
        .catch(error => {
          console.log(error);
        });

      dispatch(changeMoreProcessingOrdersLoading(false));
    } else {
      dispatch(changeProcessingOrdersLoading(true));

      //  Initial products fetch
      await orderCollection
        .where('userId', '==', userId)
        .where('status', '==', 'processing')
        .orderBy('dateCreated', 'desc')
        .limit(10)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            snapshots.docs.forEach(doc => {
              let data = doc.data();
              dispatch(addProcessingOrder(data));
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      dispatch(changeProcessingOrdersLoading(false));
    }
  };
};

export const getCancelledOrders = () => {
  return async (dispatch, getState) => {
    const {cancelledOrders} = getState().order;

    const userId = auth().currentUser.uid;

    if (cancelledOrders.length > 0) {
      dispatch(changeMoreCancelledOrdersLoading(true));

      const lastOrderData = cancelledOrders[cancelledOrders.length - 1];

      //  Trigger load more
      await orderCollection
        .where('userId', '==', userId)
        .where('status', '==', 'cancelled')
        .orderBy('dateCreated', 'desc')
        .startAfter(lastOrderData.dateCreated)
        .limit(10)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            snapshots.docs.forEach(doc => {
              let data = doc.data();
              dispatch(addCancelledOrder(data));
            });
          }
        })
        .catch(error => {
          console.log(error);
        });

      dispatch(changeMoreCancelledOrdersLoading(false));
    } else {
      dispatch(changeCancelledOrdersLoading(true));

      //  Initial products fetch
      await orderCollection
        .where('userId', '==', userId)
        .where('status', '==', 'cancelled')
        .orderBy('dateCreated', 'desc')
        .limit(10)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            snapshots.docs.forEach(doc => {
              let data = doc.data();
              dispatch(addCancelledOrder(data));
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      dispatch(changeCancelledOrdersLoading(false));
    }
  };
};

export const getDeliveredOrders = () => {
  return async (dispatch, getState) => {
    const {deliveredOrders} = getState().order;

    const userId = auth().currentUser.uid;

    if (deliveredOrders.length > 0) {
      dispatch(changeMoreDeliveredOrdersLoading(true));

      const lastOrderData = deliveredOrders[deliveredOrders.length - 1];

      //  Trigger load more
      await orderCollection
        .where('userId', '==', userId)
        .where('status', '==', 'delivered')
        .orderBy('dateCreated', 'desc')
        .startAfter(lastOrderData.dateCreated)
        .limit(10)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            snapshots.docs.forEach(doc => {
              let data = doc.data();
              dispatch(addDeliveredOrder(data));
            });
          }
        })
        .catch(error => {
          console.log(error);
        });

      dispatch(changeMoreDeliveredOrdersLoading(false));
    } else {
      dispatch(changeDeliveredOrdersLoading(true));

      //  Initial products fetch
      await orderCollection
        .where('userId', '==', userId)
        .where('status', '==', 'delivered')
        .orderBy('dateCreated', 'desc')
        .limit(10)
        .get()
        .then(snapshots => {
          if (snapshots.size > 0) {
            snapshots.docs.forEach(doc => {
              let data = doc.data();
              dispatch(addDeliveredOrder(data));
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      dispatch(changeDeliveredOrdersLoading(false));
    }
  };
};

export const refreshProcessingOrders = () => {
  return dispatch => {
    dispatch(clearProcessingOrders());
    dispatch(getProcessingOrders());
  };
};

export const refreshDeliveredOrders = () => {
  return dispatch => {
    dispatch(clearDeliveredOrders());
    dispatch(getDeliveredOrders());
  };
};

export const refreshCancelledOrders = () => {
  return dispatch => {
    dispatch(clearCancelledOrders());
    dispatch(getCancelledOrders());
  };
};

export const navigateOrderDetails = order => {
  return dispatch => {
    dispatch(selectOrder(order));
    RootNavigation.navigate('OrderDetails');
  };
};

export const cancelOrder = order => {
  return async dispatch => {
    dispatch(showSimpleLoadingModal(true));

    await orderCollection
      .doc(order.id)
      .update({status: 'cancelled', cancelledAt: new Date()})
      .then(() => {
        dispatch(refreshProcessingOrders());
        dispatch(refreshCancelledOrders());
        RootNavigation.navigate('Orders');
      })
      .catch(error => {
        console.log(error);
        errorHandler(dispatch, 'gen/default');
      });

    dispatch(showSimpleLoadingModal(false));
  };
};

export const navigateOrderItems = orderItems => {
  return dispatch => {
    dispatch(selectOrderItems(orderItems));
    RootNavigation.navigate('OrderItems');
  };
};
