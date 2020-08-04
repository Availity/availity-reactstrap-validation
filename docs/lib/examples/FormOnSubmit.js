import React from 'react';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';
import SubmitResult from './SubmitResult';

export default () => {
  const sr = React.useRef(null);
  const handleSubmit = (...args) => sr.current.handleSubmit(...args);

  return (
    <div>
      <AvForm onSubmit={handleSubmit} validateOnSubmitOnly>
        {/* With AvField */}
        <AvField name="name" label="Name" required />
        {/* With AvGroup AvInput and AvFeedback to build your own */}
        <AvGroup>
          <Label for="example">Rank</Label>
          <AvInput name="rank" id="example" required />
          {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
          <AvFeedback>This is an error!</AvFeedback>
        </AvGroup>
        {/* Radios */}
        <AvRadioGroup inline name="radioExample4" label="Radio Buttons! (inline)" required>
          <AvRadio label="Bulbasaur" value="Bulbasaur" />
          <AvRadio label="Squirtle" value="Squirtle" />
          <AvRadio label="Charmander" value="Charmander" />
          <AvRadio label="Pikachu" value="Pikachu" disabled />
        </AvRadioGroup>
        {/* Checkboxes */}
        <AvCheckboxGroup inline name="checkboxExample4" label="Checkboxes! (inline)" required>
          <AvCheckbox label="Bulbasaur" value="Bulbasaur" />
          <AvCheckbox label="Squirtle" value="Squirtle" />
          <AvCheckbox label="Charmander" value="Charmander" />
          <AvCheckbox label="Pikachu" value="Pikachu" disabled />
        </AvCheckboxGroup>
        {/* With select and AvField */}
        <AvField type="select" name="select" label="Option" helpMessage="Idk, this is an example. Deal with it!">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </AvField>

        <AvField type="select" name="select-multiple" label="Option" helpMessage="MULTIPLE!" multiple required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </AvField>
        <FormGroup>
          <Button>Submit</Button>
        </FormGroup>
      </AvForm>
      <SubmitResult ref={sr} />
    </div>
  );
};
