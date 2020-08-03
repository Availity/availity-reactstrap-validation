import React from 'react';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

export default () => {
  const [errors, setErrors] = React.useState();
  const [values, setValues] = React.useState();

  const handleSubmit = (_event, errors, values) => {
    setErrors(errors);
    setValues(values);
  };

  return (
    <div>
      <AvForm onSubmit={handleSubmit}>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" name="checkbox" /> Check it Out
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" name="inOrOut" trueValue="Yes, I'm in!" falseValue="NOPE!" /> Are You In?
          </Label>
        </AvGroup>
        <FormGroup>
          <Button>Submit</Button>
        </FormGroup>
      </AvForm>
      {values && (
        <div>
          <h5>Submission values</h5>
          Invalid: {errors && errors.join(', ')}
          <br />
          Values: <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
