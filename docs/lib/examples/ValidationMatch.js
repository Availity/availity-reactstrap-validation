import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

const Example = () => (
  <AvForm>
    <AvField name="originalEmail" label="Email" type="email" />
    <AvField name="confirmationEmail" label="Email" type="email" validate={{ match: { value: 'originalEmail' } }} />
    <Button color="primary">Submit</Button>
  </AvForm>
);

export default Example;
