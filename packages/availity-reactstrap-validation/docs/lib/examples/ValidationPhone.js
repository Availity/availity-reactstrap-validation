import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="telephone" label="Phone" type="tel" />
        <AvField name="telephoneProp" label="Phone (validate prop)" type="text" validate={{tel: true}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
