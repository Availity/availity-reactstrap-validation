import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="required" label="Required" type="text" required />
        <AvField name="requiredProp" label="Required (validate prop)" type="text" validate={{required: true}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
