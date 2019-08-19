import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withFirebase } from '../Firebase/context';
import Spinner from './Spinner';
import { isLoading } from '../actions/authActions';
import {
  Row,
  Card,
  CardBody,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';

function AddTransaction({ history, firebase }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('success');
  const [comment, setComment] = useState('');

  const {
    transactionList,
    remainingAmount,
    totalSpent,
    currency,
    uid,
    loading
  } = useSelector(state => state.user);

  const isAmountValid = remainingAmount < amount;
  const onSubmit = event => {
    event.preventDefault();
    const newID = `0${transactionList.length + 1}`;
    const newTransaction = {
      name,
      receiver,
      receiverAccount,
      amount,
      date,
      comment,
      status,
      id: newID
    };
    const transactions = {
      remainingAmount: remainingAmount - amount,
      currency,
      totalSpent: parseInt(totalSpent) + parseInt(amount),
      transactionList: [...transactionList, newTransaction]
    };
    isLoading();
    firebase.transactions(uid).set(transactions);
    history.push('/dashboard');
  };

  return (
    <div className="main ">
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-lg  p-md-4 p-2">
          <Row className="justify-content-center">
            <Col md="5" sm="8">
              <Card className="border-0">
                <CardBody>
                  <h4>New transaction</h4>
                  <Form className="py-4" onSubmit={onSubmit}>
                    <FormGroup>
                      <Label for="inputAmount">Amount *</Label>
                      <Input
                        invalid={isAmountValid}
                        type="number"
                        id="inputAmount"
                        name="amount"
                        min="8"
                        value={amount}
                        onChange={event => {
                          setAmount(event.target.value);
                        }}
                        required
                        placeholder="Amount"
                      />
                      <FormFeedback>
                        Oh noes! you don't have such money
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="inputName">Name *</Label>
                      <Input
                        type="text"
                        id="inputName"
                        name="name"
                        value={name}
                        onChange={event => {
                          setName(event.target.value);
                        }}
                        required
                        placeholder="Name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="inputDate">Pick a date</Label>
                      <Input
                        type="date"
                        id="inputDate"
                        name="date"
                        value={date}
                        onChange={event => {
                          setDate(event.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="inputReceiver">Receiver account</Label>
                      <Input
                        type="number"
                        id="inputReceiver"
                        name="receiverAccount"
                        value={receiverAccount}
                        onChange={event => {
                          setReceiverAccount(event.target.value);
                        }}
                        required
                        placeholder="0000-0000"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="inputReceiverName">Receiver name</Label>
                      <Input
                        type="text"
                        id="inputReceiverName"
                        name="receiver"
                        value={receiver}
                        onChange={event => {
                          setReceiver(event.target.value);
                        }}
                        required
                        placeholder="Sergey Snow"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="inputStatus">Satus</Label>
                      <Input
                        type="select"
                        id="inputStatus"
                        name="status"
                        value={status}
                        onChange={event => {
                          setStatus(event.target.value);
                        }}
                        required
                        placeholder="pending... "
                      >
                        <option>success</option>
                        <option>failed</option>
                        <option>unkown</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="inputComment">Comment</Label>
                      <Input
                        type="textarea"
                        id="inputComment"
                        name="comment"
                        value={comment}
                        onChange={event => {
                          setComment(event.target.value);
                        }}
                        placeholder="comment transaction... "
                      />
                    </FormGroup>
                    <Button disabled={isAmountValid} block color="primary">
                      Submit
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default withFirebase(AddTransaction);
