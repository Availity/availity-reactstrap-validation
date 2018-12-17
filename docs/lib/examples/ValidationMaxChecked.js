import React from 'react';
import { AvForm, AvCheckbox, AvCheckboxGroup } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvCheckboxGroup inline name="maxCheckedCheckboxList" label="Select No More Than Two Checkboxes" validate={{maxChecked: {value: 2}}}>
          <AvCheckbox label="Bulbasaur" value="Bulbasaur" />
          <AvCheckbox label="Squirtle" value="Squirtle" />
          <AvCheckbox label="Charmander" value="Charmander" />
          <AvCheckbox label="Pikachu" value="Pikachu" disabled />
        </AvCheckboxGroup>

        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
