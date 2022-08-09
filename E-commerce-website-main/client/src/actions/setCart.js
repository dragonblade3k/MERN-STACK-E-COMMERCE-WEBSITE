import { paymentApi } from "../api";
import {
  ADD_TO_CART,
  PAYMENT,
  PAYMENT_SUCCESFULL,
  PAYMENT_UNSUCCESFULL,

  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../constants/actionType";

export const addToCart = (product) => {
  return function (dispatch, getStore) {
    product.selected = 1;
    dispatch({ type: ADD_TO_CART, payload: product });
    localStorage.setItem("cart", JSON.stringify(getStore().cart));
  };
};
export const removeFromCart = (id) => {
  return function (dispatch, getStore) {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
    localStorage.setItem("cart", JSON.stringify(getStore().cart));
  };
};
export const updateFromCart = (id, qty) => {
  return function (dispatch, getStore) {
    dispatch({ type: UPDATE_CART, payload: { id, qty } });
    localStorage.setItem("cart", JSON.stringify(getStore().cart));
  };
};

export const paymentProduct = (token,amount)=>{
  return function(dispatch,getStore){
    dispatch({type:PAYMENT})
    paymentApi(token,amount)
    .then(data=>{
   
      if (data.data.status === "success") {
        dispatch({ type: PAYMENT_SUCCESFULL });
      } else {
        dispatch({type:PAYMENT_UNSUCCESFULL})
      }

    })
    .catch(error=>{
      console.log(error)
    })
  }
}