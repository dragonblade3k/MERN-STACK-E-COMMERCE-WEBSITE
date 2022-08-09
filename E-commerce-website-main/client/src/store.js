import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userLogin } from "./reducers/user";
import { cart, payment } from "./reducers/cart";

import { Product, SingleProduct } from "./reducers/product";


const combineReducer = combineReducers({
  payment,
  cart,
  userLogin,
  Product,
  SingleProduct,
});
export const store = createStore(
  combineReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
