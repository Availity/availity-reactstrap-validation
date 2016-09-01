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
        <AvRadioGroup name="radioExample" label="Radio Buttons!" required>
          <AvRadio label="Bulbasaur" value="Bulbasaur" id="radioOption1"/>
          <AvRadio label="Squirtle" value="Squirtle" id="radioOption2"/>
          <AvRadio label="Charmander" value="Charmander" id="radioOption3"/>
          <AvRadio label="Pikachu" value="Pikachu" id="radioOption4" disabled/>
        </AvRadioGroup>
        {/* With select and AvField */}
        <AvField type="select" name="select" label="Option" helpMessage="Idk, this is an example. Deal with it!">
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
