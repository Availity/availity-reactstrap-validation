import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default () => (
  <AvForm>
    <AvField name="date" label="Date" type="date" />
    <AvField
      name="dateProp"
      label="Date (validate prop)"
      type="text"
      validate={{ date: { format: 'MM/DD/YYYY' } }}
      title="Use MM/DD/YYYY"
    />
    <Button color="primary">Submit</Button>
  </AvForm>
);
