import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import _debounce from 'lodash/debounce';
import { Button } from 'reactstrap';

export default () => {
  const timer = React.useRef();

  // debounce to not pound the 'server'
  const validate = _debounce((value, _ctx, _input, cb) => {
    // cancel pending 'network call'
    clearTimeout(timer.current);

    // simulate network call
    timer.current = setTimeout(() => cb(value === 'valid' || value === ''), 500);
  }, 300);

  return (
    // eslint-disable-next-line no-console
    <AvForm onSubmit={console.log}>
      <AvField name="async" label="Async Validation (enter 'valid')" type="text" validate={{ async: validate }} />
      <Button color="primary">Submit</Button>
    </AvForm>
  );
};
