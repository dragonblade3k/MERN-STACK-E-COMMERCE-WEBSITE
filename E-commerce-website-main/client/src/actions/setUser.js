import { createUserApi, loginUserApi, updateUserApi,userOrderUpdateApi } from "../api";

import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  LOGOUT,
  USER_LOGIN,
  USER_LOGIN_FAILURE,
 
  UPDATE_USER_SUCCESS,
  USER_LOGIN_SUCCESS,
  UPDATE_USER_ORDERS,
  REMOVE_ALL_FROM_CART,
} from "../constants/actionType";


export const userLogin = (user) => {
  return function (dispatch) {
    dispatch({ type: USER_LOGIN });

    loginUserApi(user)
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data, login: true });
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAILURE,
        });
      });
  };
};

export const createUser = (user) => {
  return function (dispatch) {
    dispatch({ type: CREATE_USER });
    createUserApi(user)
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: data.data,
         
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


export const updateUser = (user) => {
  return function (dispatch) {
    
    updateUserApi(user)
    .then((data) => {
      
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data.data,
        
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const userLogout = () => {
  localStorage.removeItem("userInfo");
  
  return {
    type: LOGOUT,
  };
};

export const updateOrders = (user,orderIds)=>{
  return function(dispatch){
    
    userOrderUpdateApi(user,orderIds)
    .then(data=>{
      dispatch({ type: UPDATE_USER_ORDERS, payload: data.data });
      // console.log(data.data);
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      dispatch({ type: REMOVE_ALL_FROM_CART });
      localStorage.removeItem("cart");
    })
    .catch()

  }

}


