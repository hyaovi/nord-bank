import {
  LOGIN,
  LOGOUT,
  GET_USER_DATA,
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING,
} from './actionTypes';
import { firebase } from '../Firebase';

export const signUp = ({ email, password }, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(isLoading());
    const userAuth = await firebase.doCreateUserWithEmailAndPassword(
      email,
      password
    );
    const { uid } = userAuth.user;
    // SET USER EXTRA INFO (EMAIL, AND USERNAME)
    firebase.user(uid).update({
      name: email.split('@')[0],
      email: email,
    });
    // INITIALIZE TRANSACTIONS
    const transactions = {
      remainingAmount: 1000000,
      totalSpent: 0,
      currency: 'US',
      transactionList: [],
    };
    firebase.transactions(uid).set(transactions);

    firebase.user(uid).on('value', (snapshot) => {
      let userData = snapshot.val();
      localStorage.setItem('userData', JSON.stringify(userData));
      return { type: LOGIN, payload: { ...userData, uid } };
    });
  } catch (error) {
    dispatch(isLoading(false));
    dispatch(getErrors(error));
  }
  return null;
};

export const signIn = ({ email, password }, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(isLoading());
    const userAuth = await firebase.doSignInWithEmailAndPassword(
      email,
      password
    );
    const { uid } = userAuth.user;
    firebase.user(uid).on('value', (snapshot) => {
      let userData = snapshot.val();
      localStorage.setItem('userData', JSON.stringify(userData));
      return { type: LOGIN, payload: { ...userData, uid } };
    });
    history.push('/dashboard');
  } catch (error) {
    dispatch(isLoading(false));
    dispatch(getErrors(error));
  }
};
export const setCurrentUser = (history, authUser) => (dispatch) => {
  dispatch({ type: LOGIN, payload: authUser });
  dispatch(isLoading(false));
  history.push('/dashboard');
};
export const userAuth = (dispatch) => {
  dispatch({ type: LOGIN });
};

export const getErrors = (error) => ({
  type: GET_ERRORS,
  payload: error,
});
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const logOut = () => ({
  type: LOGOUT,
});
export const isLoading = (loading = true) => ({
  type: LOADING,
  payload: loading,
});

export const setUserData = (transactions) => {
  return {
    type: GET_USER_DATA,
    payload: transactions,
  };
};
