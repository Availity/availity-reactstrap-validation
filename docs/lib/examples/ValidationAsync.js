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

  // debounce to not pound the 'server'
  validate = _debounce((value, ctx, input, cb) => {

    // cancel pending 'network call'
    clearTimeout(this.timeout);

    // simulate network call
    this.timeout = setTimeout(() => {
      cb(value === 'valid' || value === '');
    }, 500);

  }, 300);

  render() {
    return (
      <AvForm onSubmit={console.log.bind(console)}>
        <AvField name="async" label="Async Validation (enter 'valid')" type="text" validate={{async: this.validate}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
