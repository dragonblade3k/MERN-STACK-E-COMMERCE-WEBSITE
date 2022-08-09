import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  LOGOUT,
  UPDATE_USER_ORDERS,
  UPDATE_USER_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from "../constants/actionType";



const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

const initialState = {
  login: userInfo ? true : false,
  user: userInfo,
  isAuth: userInfo ? true : false,
};

export function userLogin(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        login: false,
        user: {},
      };
    case USER_LOGIN_SUCCESS:
      return {
        login: true,
        user: action.payload,
        isAuth: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        login: false,
        user: {},
        isAuth: false,
        error: true,
      };
    case CREATE_USER:
      return {
        login: false,
        user: {},
      };
    case CREATE_USER_SUCCESS:
      return {
        login: true,
        user: action.payload,
        isAuth: true,
      };

    case LOGOUT:
      return {
        login: false,
        user: {},
        isAuth: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        login: true,
        user: action.payload,
        isAuth: true,
      };
    case UPDATE_USER_ORDERS:
      return {
        login: true,
        user: action.payload,
        isAuth: true,
      };
    default:
      return state;
  }
}
