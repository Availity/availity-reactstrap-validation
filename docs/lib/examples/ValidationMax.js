import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="maxPropString" label="Max" type="number" max="10" />
        <AvField name="maxPropNumber" label="Max (w/ prop as a number)" type="number" max={10} />
        <AvField name="maxPropNumberProp" label="Max (validate prop)" type="text" validate={{max: {value: 10}}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
