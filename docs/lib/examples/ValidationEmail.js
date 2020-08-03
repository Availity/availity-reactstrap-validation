import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default () => (
  <AvForm>
    <AvField name="email" label="Email" type="email" />
    <AvField name="emailProp" label="Email (validate prop)" type="text" validate={{ email: true }} />
    <Button color="primary">Submit</Button>
  </AvForm>
);
