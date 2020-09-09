import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default () => (
  <AvForm>
    <AvField
      name="pattern"
      label="Pattern"
      type="text"
      pattern="^[A-Z]*$"
      placeholder="^[A-Z]*$"
      title="Only Uppercase letters are allowed for this example"
    />
    <AvField
      name="patternPropRegex"
      label="Pattern (validate prop with regex)"
      type="text"
      validate={{ pattern: { value: /^[A-Z]*$/ } }}
      placeholder="^[A-Z]*$"
      title="Only Uppercase letters are allowed for this example"
    />
    <AvField
      name="patternPropString"
      label="Pattern (validate prop with string)"
      type="text"
      validate={{ pattern: { value: '^[A-Z]*$' } }}
      placeholder="^[A-Z]*$"
      title="Only Uppercase letters are allowed for this example"
    />
    <Button color="primary">Submit</Button>
  </AvForm>
);
