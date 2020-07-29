import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import _debounce from 'lodash.debounce';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = { valid: 'true' };
    this.handleSubmit = console.log.bind(console); // eslint-disable-line no-console
  }

  // debounce to not pound the 'server'
  validate = _debounce((value, _ctx, _input, cb) => {

    // cancel pending 'network call'
    clearTimeout(this.timeout);

    // simulate network call
    this.timeout = setTimeout(() => cb(!value || value === 'valid'), 500);

  }, 300);

  render() {
    return (
      <AvForm onSubmit={this.handleSubmit}>
        <AvField name="async" label="Async Validation (enter 'valid')" type="text" validate={{async: this.validate}} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
