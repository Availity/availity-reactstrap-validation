import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default () => (
  <AvForm>
    <AvField name="minLengthPropString" label="Min Length" type="text" minLength="10" />
    <AvField name="minLengthPropNumber" label="Min Length (w/ prop as a number)" type="text" minLength={10} />
    <AvField
      name="minLengthPropNumberProp"
      label="Min Length (validate prop)"
      type="text"
      validate={{ minLength: { value: 10 } }}
    />
    <Button color="primary">Submit</Button>
  </AvForm>
);
