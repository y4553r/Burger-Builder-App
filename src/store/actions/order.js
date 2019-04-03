import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// SYNCHRONOUS ACTIONS CREATORS
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  };
};

export const fetchOrdersInit = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
    error: error
  };
};

// ASYNCHRONOUS ACTIONS CREATORS
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth='+token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      }).catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
}

export const fetchOrdersStart = (token) => {
  return dispatch => {
    dispatch(fetchOrdersInit());
    axios.get('/orders.json?auth='+token)
      .then(response => {
        let fetchedData = [];
        for(let key in response.data) {
          fetchedData.push({...response.data[key], key: key});
        }
        dispatch(fetchOrdersSuccess(fetchedData));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  }
}