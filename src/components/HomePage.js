import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import Spinner from './Spinner';
import {
  setCurrentUser,
  getErrors,
  clearErrors,
  signIn,
  isLoading
} from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { withFirebase } from '../Firebase/context';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  FormFeedback
} from 'reactstrap';
import './HomePage.css';

function HomePage({ history, firebase }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(state => state.error);
  const loading = useSelector(state => state.user.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const subscribe = () =>
      firebase.auth.onAuthStateChanged(auth => {
        if (auth) {
          dispatch(isLoading());
          const { uid } = auth;
          firebase.user(uid).on('value', snapshot => {
            const userData = snapshot.val();
            dispatch(setCurrentUser(history, { uid, ...userData }));
          });
        }
      });
    subscribe();
    return () => undefined;
  }, [firebase, dispatch, history]);

  const onSubmit = event => {
    event.preventDefault();
    const login = async () => {
      try {
        dispatch(clearErrors());
        dispatch(isLoading());
        const userAuth = await firebase.doSignInWithEmailAndPassword(
          email,
          password
        );
        const { uid } = userAuth.user;
        firebase.user(uid).on('value', snapshot => {
          let userData = snapshot.val();
          dispatch(signIn({ ...userData, uid }));
        });
        history.push('/dashboard');
      } catch (error) {
        dispatch(isLoading(false));
        dispatch(getErrors(error));
      }
    };
    login();
  };
  return (
    <div className="home-page">
      <div className="bg-img" />
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            {loading ? (
              <Spinner />
            ) : (
              <Card className=" rounded-lg border-0 p-md-4 ">
                <CardBody>
                  <div className="mb-4 text-center">
                    <img
                      src={logo}
                      alt="Logo"
                      srcSet=""
                      width="45"
                      height="45"
                      className="mb-1"
                    />
                    <h3 className="text-primary">Nord Bank</h3>
                  </div>
                  <h4 className="text-center text-muted">Login to access</h4>
                  <Form className="py-4" onSubmit={onSubmit}>
                    <FormGroup>
                      <Label for="inputEmail">Email address</Label>
                      <Input
                        bsSize="lg"
                        type="email"
                        id="inputEmail"
                        name="email"
                        value={email}
                        onChange={event => {
                          setEmail(event.target.value);
                        }}
                        required
                        placeholder="Enter your email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="inputPassword">Enter your password</Label>
                      <Input
                        bsSize="lg"
                        type="password"
                        id="inputPassword"
                        name="password"
                        value={password}
                        onChange={event => {
                          setPassword(event.target.value);
                        }}
                        invalid={error !== null}
                        required
                        placeholder="Enter your password"
                      />
                      {error && <FormFeedback>{error.message}</FormFeedback>}
                    </FormGroup>

                    <Button block color="primary" size="lg">
                      Submit
                    </Button>
                  </Form>
                  <a href="#.">Can't login?</a>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withFirebase(HomePage);
