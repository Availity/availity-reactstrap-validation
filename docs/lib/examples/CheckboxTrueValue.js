import React from 'react';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';
import SubmitResult from './SubmitResult';

export default () => {
  const sr = React.useRef(null);
  const handleSubmit = (...args) => sr.current.handleSubmit(...args);

  return (
    <div>
      <AvForm onSubmit={handleSubmit}>
        <FormGroup>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="agree" trueValue="User Agreed" required /> Agree to this!
            </Label>
          </AvGroup>
        </FormGroup>
        <Button>Submit</Button>
      </AvForm>
      <SubmitResult ref={sr} />
    </div>
  );
};
