import React from 'react';
import { Table as TableStrap, Badge } from 'reactstrap';
import { sortBy } from 'lodash';
import { useHistory } from 'react-router-dom';

const StatusColor = (status) => {
  if (status.toLowerCase() === 'failed') {
    return 'danger';
  }
  if (status.toLowerCase() === 'success') {
    return 'info';
  }
  return 'dark';
};
const SORTS = {
  NONE: (list) => list,
  Name: (list) => sortBy(list, 'name'),
  Receiver: (list) => sortBy(list, 'receiver'),
  Date: (list) => sortBy(list, 'date').reverse(),
  Amount: (list) => sortBy(list, 'amount').reverse(),
};

const StatusBadge = ({ status }) => (
  <Badge color={StatusColor(status)}>{status}</Badge>
);
const isSearched = (searchTerm) => (transaction) =>
  transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  transaction.receiver.toLowerCase().includes(searchTerm.toLowerCase());
function Table({ transactions, userCurrency, searchTerm, sortKey }) {
  const history = useHistory();
  return (
    <div className='my-4'>
      {transactions && (
        <TableStrap bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Receiver</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {SORTS[sortKey](transactions)
              .filter(isSearched(searchTerm))
              .map((transaction, index) => (
                <tr
                  key={transaction.id}
                  onClick={() => history.push(`/transaction/${transaction.id}`)}
                >
                  <th scope='row'>{index + 1}</th>
                  <td>{transaction.name}</td>
                  <td>{transaction.receiver}</td>
                  <td>{transaction.receiverAccount}</td>
                  <td>{`${transaction.amount}  ${userCurrency}`}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.comment}</td>
                  <td>
                    {' '}
                    <StatusBadge status={transaction.status} />{' '}
                  </td>
                </tr>
              ))}
          </tbody>
        </TableStrap>
      )}
    </div>
  );
}

export default Table;
