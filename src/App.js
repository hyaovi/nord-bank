import React, { useCallback, useEffect } from 'react';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AddTransaction from './components/AddTransaction';
import TransactionDetail from './components/TransactionDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import ProtectedRoute from './ProtectedRoute';
import { firebase } from './Firebase';
import './sass/App.css';
import { useDispatch } from 'react-redux';
import { setUser, setUserData, isLoading } from './actions/authActions';
function App() {
  const user = JSON.parse(localStorage.getItem('userData'));
  const dispatch = useDispatch();
  const getCurrentUser = useCallback(() => {
    if (user && user.uid) {
      const { uid } = user;
      dispatch(setUser({ ...user }));
      // GET AND SET USER DATA
      dispatch(isLoading());
      firebase.transactions(uid).on('value', (snapshot) => {
        dispatch(setUserData(snapshot.val()));
      });
    } else {
      return firebase.auth.onAuthStateChanged((auth) => {
        if (auth) {
          const { uid } = auth;
          firebase.user(uid).on('value', (snapshot) => {
            const userData = snapshot.val();
            dispatch(setUser({ uid, ...userData }));
          });

          // GET AND SET USER DATA
          firebase.transactions(uid).on('value', (snapshot) => {
            dispatch(setUserData(snapshot.val()));
          });
        }
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    getCurrentUser();
    return () => undefined;
  }, [getCurrentUser]);
  return (
    <Router>
      <Container fluid className=''>
        <Navbar />

        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/register' exact component={Register} />
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          <ProtectedRoute
            path='/transaction/:id'
            component={TransactionDetail}
          />
          <ProtectedRoute path='/addtransaction' component={AddTransaction} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
