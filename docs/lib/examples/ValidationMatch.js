import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="originalEmail" label="Email" type="email" />
        <AvField name="confirmationEmail" label="Email" type="email" validate={{match:{value:'originalEmail'}}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
