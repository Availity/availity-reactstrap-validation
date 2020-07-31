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

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {};
  }

  handleValidSubmit(_event, values) {
    this.setState({values});
  }

  render() {
    return (
      <div>
        <AvForm onValidSubmit={this.handleValidSubmit}>
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
          <AvRadioGroup inline name="radioExample5" label="Radio Buttons! (inline)" required>
            <AvRadio label="Bulbasaur" value="Bulbasaur" />
            <AvRadio label="Squirtle" value="Squirtle" />
            <AvRadio label="Charmander" value="Charmander" />
            <AvRadio label="Pikachu" value="Pikachu" disabled />
          </AvRadioGroup>
          {/* Checkboxes */}
          <AvCheckboxGroup inline name="checkboxExample5" label="Checkboxes! (inline)" required>
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
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </AvForm>
        {this.state.values && (
          <div>
            <h5>Submission values</h5>
            Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}
