import {
  LOGIN,
  LOGOUT,
  ADD_TRANSACTION,
  GET_USER_DATA,
  LOADING,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  loading: false,
  currency: ' ',
  remainingAmount: 0,
  totalSpent: 0,
  transactionList: [],
};
const extractUserData = (data) => {
  const { uid, email, name, currency } = data.payload;
  return { uid, email, name, currency };
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const info = extractUserData(action);
      return {
        ...state,
        isAuthenticated: true,
        ...info,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        loading: false,
      };
    case GET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        loading: false,
        transactions: [...state.transactions, action.payload],
      };
    default:
      return state;
  }
};

export default authReducer;
