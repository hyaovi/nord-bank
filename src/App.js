import React from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AddTransaction from './components/AddTransaction';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import ProtectedRoute from './ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <Container className=''>
        <Navbar />

        <Switch>
          <Route path='/' exact component={HomePage} />
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          <ProtectedRoute path='/addtransaction' component={AddTransaction} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
