import React from 'react';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }

  handleSubmit(_event, errors, values) {
    this.setState({errors, values});
  }

  render() {
    return (
      <div>
        <AvForm onSubmit={this.handleSubmit}>
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
        {this.state.values && (
          <div>
            <h5>Submission values</h5>
            Invalid: {this.state.errors.join(', ')}
            <br />
            Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}
