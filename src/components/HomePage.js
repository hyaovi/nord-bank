import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import Spinner from './Spinner';
import { signIn } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
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

function HomePage({ history }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(signIn({ email, password }, history));
  };
  return isAuthenticated ? (
    <Redirect to='/dashboard' />
  ) : (
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
              <h5 className='text-center text-muted'>Login to access</h5>
              <Form className='py-3' onSubmit={onLogin}>
                <FormGroup>
                  <Input
                    bsSize='lg'
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
                    bsSize='lg'
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

                <p>
                  <Button block color='primary' size='lg'>
                    Login
                  </Button>
                </p>
                <hr />
                <p className='d-flex justify-content-between'>
                  <a className='text-center' color='primary' href='/register'>
                    Regsiter
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

// DEMO ACCOUNT BUTTON
export const DemoAccountBtn = () => {
  const EMAIL = 'johnwick@mail.com';
  const PASSWORD = '123456';
  const dispatch = useDispatch();
  const history = useHistory();
  const launchDemo = (event) => {
    event.preventDefault();
    console.log(EMAIL);
    dispatch(signIn({ email: EMAIL, password: PASSWORD }, history));
  };
  return (
    <button className='btn btn-secondary px-5' onClick={launchDemo}>
      Demo
    </button>
  );
};

export default HomePage;
