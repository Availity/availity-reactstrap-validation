import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="number" label="Number" type="number" />
        <AvField name="numberProp" label="Number (validate prop)" type="text" validate={{number: true}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
