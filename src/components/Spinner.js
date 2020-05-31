import React from 'react';
import { Spinner as RSpinner } from 'reactstrap';

function Spinner() {
  return (
    <div className='spinner'>
      <RSpinner color='primary' />
    </div>
  );
}

export default Spinner;
