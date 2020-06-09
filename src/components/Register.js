import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.svg';
import Spinner from './Spinner';
import { setCurrentUser, signUp, isLoading } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import FirebaseContext from '../Firebase/context';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  FormFeedback,
} from 'reactstrap';
import { DemoAccountBtn } from './HomePage';

function ReigsterPage({ history }) {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscribe = () =>
      firebase.auth.onAuthStateChanged((auth) => {
        if (auth) {
          dispatch(isLoading());
          const { uid } = auth;
          firebase.user(uid).on('value', (snapshot) => {
            const userData = snapshot.val();
            dispatch(setCurrentUser(history, { uid, ...userData }));
          });
        }
      });
    subscribe();
    return () => undefined;
  }, [firebase, dispatch, history]);

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(signUp({ email, password }, history));
  };
  return (
    <Row className='home-page  mt-3 mt-md-5'>
      <Col md={6} lg={4} className='mx-auto'>
        {loading ? (
          <Spinner />
        ) : (
          <Card className=' rounded-lg p-md-3 mt-3 mt-md-5'>
            <CardBody>
              <div className=' text-center'>
                <img
                  src={logo}
                  alt='Logo'
                  srcSet=''
                  width='39'
                  height='39'
                  className='mb-0'
                />
                <h5 className='text-primary mb-2'>Nord Bank</h5>
              </div>
              <h5 className='text-center text-muted'>Register to access</h5>
              <Form className='py-3' onSubmit={onLogin}>
                <FormGroup>
                  <Input
                    type='email'
                    id='inputEmail'
                    name='email'
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    required
                    placeholder='Enter your email'
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type='password'
                    id='inputPassword'
                    name='password'
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    invalid={error !== null}
                    required
                    placeholder='Enter your password'
                  />
                  {error && <FormFeedback>{error.message}</FormFeedback>}
                </FormGroup>
                <Button block color='primary' size='lg'>
                  Register
                </Button>
                <hr />
                <p className='d-flex justify-content-between'>
                  <a className='text-center' color='primary' href='/'>
                    Login
                  </a>
                  <DemoAccountBtn />
                </p>
              </Form>
            </CardBody>
          </Card>
        )}
      </Col>
    </Row>
  );
}

export default ReigsterPage;
