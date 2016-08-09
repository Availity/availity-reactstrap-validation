import React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {};
  }

  handleValidSubmit(event, values) {
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
        {this.state.values && <div>
          <h5>Submission values</h5>
          Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>}
      </div>
    );
  }
}
