import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="step5" label="Step" type="number" step="5" />
        <AvField name="step5Prop" label="Step (validate prop)" type="number" validate={{step: {value: 5}}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
