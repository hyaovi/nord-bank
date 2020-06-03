import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
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
} from 'reactstrap';

function AddTransaction({ history }) {
  const { id } = useParams();
  const [details, setdetails] = useState(undefined);

  const { transactionList, loading } = useSelector((state) => state.user);
  const getSelectedTransaction = useCallback(() => {
    if (transactionList && transactionList.length > 0) {
      const transaction = transactionList.filter((trans) => trans.id === id);
      return transaction[0];
    } else return undefined;
  }, [id, transactionList]);
  useEffect(() => {
    setdetails(getSelectedTransaction());
  }, [getSelectedTransaction]);

  return (
    <div className='main '>
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : !!details ? (
        <div className='bg-white rounded-lg  p-md-4 p-2'>
          <Row className='justify-content-center'>
            <Col md='5' sm='8'>
              <Card className='border-0'>
                <CardBody>
                  <div className='row align-items-center'>
                    <div className='col-3'>
                      <Button
                        color='secondary'
                        onClick={() => history.push('/dashboard')}
                      >
                        back
                      </Button>
                    </div>
                    <div className='col-auto'>
                      <h4>Transaction number: {id}</h4>
                    </div>
                  </div>
                  <Form className='py-4' disabled>
                    <FormGroup>
                      <Label for='inputAmount'>Amount *</Label>
                      <Input
                        type='number'
                        id='inputAmount'
                        name='amount'
                        disabled
                        value={details.amount}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for='inputName'>Name *</Label>
                      <Input
                        type='text'
                        id='inputName'
                        name='name'
                        disabled
                        value={details.name}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for='inputDate'>Date</Label>
                      <Input
                        type='date'
                        id='inputDate'
                        name='date'
                        value={details.date}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for='inputReceiver'>Receiver account</Label>
                      <Input
                        type='number'
                        id='inputReceiver'
                        name='receiverAccount'
                        disabled
                        value={details.receiverAccount}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for='inputReceiverName'>Receiver name</Label>
                      <Input
                        type='text'
                        id='inputReceiverName'
                        name='receiver'
                        disabled
                        value={details.receiver}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for='inputStatus'>Satus</Label>
                      <Input
                        type='select'
                        id='inputStatus'
                        name='status'
                        disabled
                      >
                        <option selected>{details.status}</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for='inputComment'>Comment</Label>
                      <Input
                        type='textarea'
                        id='inputComment'
                        name='comment'
                        disabled
                        value={!!details.comment || 'No commnent...'}
                      />
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <h2>Not Found</h2>
      )}
    </div>
  );
}

export default AddTransaction;
