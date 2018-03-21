import React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Button,  Label, FormGroup  } from 'reactstrap';

export default class FormExample extends React.Component {
  render() {
    return (
      <AvForm>
        {/* With AvField */}
        <AvField name="name" label="Name" required />
        {/* With AvGroup AvInput and AvFeedback to build your own */}
        <AvGroup>
          <Label for="example">Rank</Label>
          <AvInput name="rank" id="example" required />
          <AvFeedback>This is an error!</AvFeedback>
        </AvGroup>
        {/* Radios */}
        <AvRadioGroup name="radioExample" label="Radio Buttons!" required errorMessage="Pick one!">
          <AvRadio label="Bulbasaur" value="Bulbasaur" />
          <AvRadio label="Squirtle" value="Squirtle" />
          <AvRadio label="Charmander" value="Charmander" />
          <AvRadio label="Pikachu" value="Pikachu" disabled />
        </AvRadioGroup>

        <AvRadioGroup inline name="radioExample2" label="Radio Buttons! (inline)" required>
          <AvRadio label="Bulbasaur" value="Bulbasaur" />
          <AvRadio label="Squirtle" value="Squirtle" />
          <AvRadio label="Charmander" value="Charmander" />
          <AvRadio label="Pikachu" value="Pikachu" disabled />
        </AvRadioGroup>
        {/* With select and AvField */}
        <AvField type="select" name="select" label="Option" helpMessage="Idk, this is an example. Deal with it!">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </AvField>

        <AvField type="select" name="select-multiple" label="Option" helpMessage="MULTIPLE!" multiple>
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
    );
  }
}
