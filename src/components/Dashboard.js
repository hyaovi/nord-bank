import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from './Table';
import { setUserData, isLoading } from '../actions/authActions';
import FirebaseContext from '../Firebase/context';
import { Row, Col, Badge, Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/Dashboard.css';
import Spinner from './Spinner';

function Dashboard() {
  const firebase = useContext(FirebaseContext);
  const [searchTerm, SetSearchTerm] = useState('');
  const [sortKey, SetSortKey] = useState('NONE');
  const { transactionList, loading, totalSpent, currency, uid } = useSelector(
    (state) => state.user
  );
  firebase.user(uid).update({
    name: 'John Wick',
    email: 'johnwick@wicked.com',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoading());
    firebase.transactions(uid).on('value', (snapshot) => {
      dispatch(setUserData(snapshot.val()));
    });
  }, [uid, firebase, dispatch]);

  return (
    <div className='main '>
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-white rounded-lg  p-md-4 p-2 shadow-lg'>
          <Row className='align-items-end mb-2 mb-md-5'>
            <Col md='2' sm='12'>
              <h2 className='text-primary mb-0'>Transactions</h2>
              <small>
                Total spent:{' '}
                <Badge color='light'>
                  {totalSpent} {'  '} {currency}
                </Badge>
              </small>
            </Col>
            <Col md='3' sm='6'>
              <Form inline>
                <FormGroup>
                  <Label for='filter' className='mb-2 mr-sm-2 mb-sm-0'>
                    Filter by{' '}
                  </Label>
                  <Input
                    type='select'
                    name='sortKey'
                    id='filter'
                    value={sortKey}
                    onChange={(event) => SetSortKey(event.target.value)}
                  >
                    <option>Name</option>
                    <option>Amount</option>
                    <option>Date</option>
                    <option>Receiver</option>
                  </Input>
                </FormGroup>
              </Form>
            </Col>
            <Col md='6' sm='6'>
              <Form inline>
                <FormGroup>
                  <Label className='mr-2 mr-sm-1 ' for='inputSearch'>
                    Search
                  </Label>
                  <Input
                    type='text'
                    name='search'
                    id='inputSearch'
                    value={searchTerm}
                    onChange={(event) => SetSearchTerm(event.target.value)}
                    placeholder='transaction'
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Table
            transactions={transactionList}
            userCurrency={currency}
            searchTerm={searchTerm}
            sortKey={sortKey}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
