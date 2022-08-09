import { fetchProductsApi, fetchProductApi,reviewProductApi } from "../api";
import {
  FETCH_ALL_DATA,
  FETCH_SINGLE_DATA,
  FETCH_SINGLE_DATA_SUCCESS,
  FETCH_SUCCESS,
  REVIEW,
  REVIEW_SUCCESS,
} from "../constants/actionType";

export const fetchProducts = () => {
  return function (dispatch) {
    dispatch({ type: FETCH_ALL_DATA });
    fetchProductsApi()
      .then((data) => {
       
        dispatch({ type: FETCH_SUCCESS, payload: data.data, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchProduct = (id) => {
  return function (dispatch) {
    dispatch({ type: FETCH_SINGLE_DATA });
    fetchProductApi(id)
      .then((data) => {
        
        dispatch({    
          type: FETCH_SINGLE_DATA_SUCCESS,
          payload: data.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const reviewProduct = (id,review) => {
  return function (dispatch) {
    dispatch({ type: REVIEW });
    reviewProductApi(id,review)
      .then((data) => {
        
        dispatch({    
          type: REVIEW_SUCCESS,
          payload: data.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
