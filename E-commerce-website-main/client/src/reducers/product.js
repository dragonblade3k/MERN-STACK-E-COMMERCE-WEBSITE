import {
  FETCH_ALL_DATA,
  FETCH_SUCCESS,
  FETCH_SINGLE_DATA,
  FETCH_SINGLE_DATA_SUCCESS,
  REVIEW,
  REVIEW_SUCCESS,
  
} from "../constants/actionType";

const intialState = {
  loading: true,
  product: [],
  error: false,
};

export function Product(state = intialState, action) {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return {
        loading: true,
        product: [],
        error: false,
      };
    case FETCH_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    

    default:
      return state;
  }
}

const intialStateS = {
  loading: true,
  SingleProduct: [],
  error: false,
};

export function SingleProduct(state = intialStateS, action) {
  switch (action.type) {
    case FETCH_SINGLE_DATA:
      return {
        loading: true,
        SingleProduct: [],
        error: false,
      };
    case FETCH_SINGLE_DATA_SUCCESS:
      return {
        loading: false,
        SingleProduct: action.payload,
      };
    case REVIEW:
      return {
        loading: true,
        SingleProduct: action.payload,
      };
    case REVIEW_SUCCESS:
        return {
          loading: false,
          SingleProduct: action.payload,
        };
    

    default:
      return state;
  }
}
