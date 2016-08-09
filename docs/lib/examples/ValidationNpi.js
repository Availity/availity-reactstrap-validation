import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="npi" label="NPI" type="text" validate={{npi: true}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
