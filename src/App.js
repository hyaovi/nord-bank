import React from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AddTransaction from './components/AddTransaction';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import ProtectedRoute from './ProtectedRoute';
import { withFirebase } from './Firebase/context';

import './App.css';

const style = { marginTop: '80px' };
function App({ firebase }) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container fluid style={style} className="px-md-5">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/addtransaction" component={AddTransaction} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default withFirebase(App);
