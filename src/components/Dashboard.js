import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from './Table';
import { setUserData, isLoading } from '../actions/authActions';
import FirebaseContext from '../Firebase/context';
import { Row, Col, Badge, Form, FormGroup, Label, Input } from 'reactstrap';
import '../sass/Dashboard.scss';
import Spinner from './Spinner';
import { Activity, Calendar, TrendingUp } from 'react-feather';
import { getCurrentMonthSpent } from '../utils';
function Dashboard() {
  const firebase = useContext(FirebaseContext);
  const [searchTerm, SetSearchTerm] = useState('');
  const [sortKey, SetSortKey] = useState('NONE');
  const { transactionList, loading, totalSpent, currency, uid } = useSelector(
    (state) => state.user
  );

  // const currentMonthSpent = getCurrentMonthSpent(transactionList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoading());
    firebase.transactions(uid).on('value', (snapshot) => {
      dispatch(setUserData(snapshot.val()));
    });
  }, [uid, firebase, dispatch]);
  const [current, setcurrent] = useState({ spentList: [], spentSum: 0 });
  useEffect(() => {
    const { spentList, spentSum } = getCurrentMonthSpent(transactionList);

    setcurrent({ spentList, spentSum });
    return () => undefined;
  }, [transactionList]);
  return (
    <div className='main '>
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='row  '>
            <div className='col-xl-3 col-lg-6 p-3'>
              <div className='card shadow rounded-lg'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>
                      <h6 className='card-title text-uppercase text-muted'>
                        Total Spent
                      </h6>
                      <span className='h4 font-weight-bold mb-0'>
                        {totalSpent} {'  '} {currency}
                      </span>
                    </div>
                    <div className='col-auto'>
                      <span className='icon-container p-3 rounded-circle bg-info text-white'>
                        <Activity />
                      </span>
                    </div>
                  </div>
                  <p className='mt-3 mb-0 text-muted'>14%</p>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-lg-6 p-3'>
              <div className='card shadow rounded-lg'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>
                      <h6 className='card-title text-uppercase text-muted'>
                        Spent this month
                      </h6>
                      <span className='h4 font-weight-bold mb-0'>
                        {current.spentSum}
                      </span>
                    </div>
                    <div className='col-auto'>
                      <span className='icon-container p-3 rounded-circle bg-primary text-white'>
                        <Calendar />
                      </span>
                    </div>
                  </div>
                  <p className='mt-3 mb-0 text-muted'>14%</p>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-lg-6 p-3'>
              <div className='card shadow rounded-lg'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>
                      <h6 className='card-title text-uppercase text-muted'>
                        Highest Transaction
                      </h6>
                      <span className='h4 font-weight-bold mb-0'>
                        {current.spentList.length > 0 &&
                          Math.max(...current.spentList)}
                      </span>
                    </div>
                    <div className='col-auto'>
                      <span className='icon-container p-3 rounded-circle bg-danger text-white'>
                        <TrendingUp />
                      </span>
                    </div>
                  </div>
                  <p className='mt-3 mb-0 text-muted'>14%</p>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-lg-6 p-3'>
              <div className='card shadow rounded-lg'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>
                      <h6 className='card-title text-uppercase text-muted'>
                        Highest Day
                      </h6>
                      <span className='h4 font-weight-bold mb-0'>4567897</span>
                    </div>
                    <div className='col-auto'>
                      <span className='icon-container p-3 rounded-circle bg-success text-white'>
                        <TrendingUp />
                      </span>
                    </div>
                  </div>
                  <p className='mt-3 mb-0 text-muted'>14%</p>
                </div>
              </div>
            </div>
          </div>
          <div className='logs bg-white rounded-lg  p-md-4 p-2 shadow-lg'>
            <Row classNa6e='align-items-end mb-2 mb-md-5'>
              <Col md='3' sm='12'>
                <h3 className='text-primary mb-0'>Transactions</h3>
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
                      className='custom-select'
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
        </>
      )}
    </div>
  );
}

export default Dashboard;
