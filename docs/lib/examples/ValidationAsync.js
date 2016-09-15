import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import _debounce from 'lodash.debounce';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      valid: 'true'
    }
  }

  validate = (value) => {

      this.timeout = setTimeout(() => {}, 250);
  };

  render() {
    return (
      <AvForm onSubmit={console.log.bind(console)}>
        <AvField name="async" label="Async Validation (enter 'valid')" type="text" validate={{async: this.validate}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
