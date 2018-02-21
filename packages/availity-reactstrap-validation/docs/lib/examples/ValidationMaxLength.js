import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="maxLengthPropString" label="Max Length" type="text" maxLength="10" />
        <AvField name="maxLengthPropNumber" label="Max Length (w/ prop as a number)" type="text" maxLength={10} />
        <AvField name="maxLengthPropNumberProp" label="Max Length (validate prop)" type="text" validate={{maxLength: {value: 10}}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
