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

  const model = {
    checkbox1: true,
    checkbox2: false,
    checkbox3: false,
    checkbox4: true,
    checkbox5: 'yes',
    checkbox6: 'yes',
    checkbox7: 'no',
    checkbox8: 'no',
    checkbox9: 'other?',
  };

  return (
    <div>
      <AvForm onSubmit={handleSubmit} model={model}>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" name="checkbox1" /> true is "checked" (default)
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" name="checkbox2" /> false is "unchecked" (default)
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" trueValue={false} falseValue name="checkbox3" /> false can be "checked"
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" trueValue={false} falseValue name="checkbox4" /> true can be "unchecked"
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" trueValue="yes" name="checkbox5" /> make "yes" checked
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" falseValue="yes" name="checkbox6" /> make "yes" unchecked
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" trueValue="no" falseValue="yes" name="checkbox7" /> make "no" checked
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" trueValue="yes" falseValue="no" name="checkbox8" /> make "no" unchecked
          </Label>
        </AvGroup>
        <AvGroup check>
          <Label check>
            <AvInput type="checkbox" name="checkbox9" /> any values that are not the trueValue is unchecked
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
