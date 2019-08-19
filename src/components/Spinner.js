import React from 'react';
import { Spinner as RSpinner } from 'reactstrap';
import './Spinner.css';

function Spinner() {
  return (
    <div className="spinner">
      <RSpinner color="primary" />
    </div>
  );
}

export default Spinner;
