import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="minPropString" label="Min" type="number" min="10" />
        <AvField name="minPropNumber" label="Min (w/ prop as a number)" type="number" min={10} />
        <AvField name="minPropNumberProp" label="Min (validate prop)" type="text" validate={{min: {value: 10}}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
