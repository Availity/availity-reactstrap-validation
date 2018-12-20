import React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }

  handleSubmit(event, errors, values) {
    this.setState({errors, values});
  }

  render() {
    const defaultValues = {
      locationType: 'work',
      locationQualities: [
        'beautiful',
        'awesome',
        'wonderful',
      ],
      name: 'Availity',
      location: {
        street: '10752 Deerwood Park Blvd',
        suite: '110',
        city: 'Jacksonville',
        state: 'Florida',
        zip: '32256',
      },
      checkItOut: true,
    };

    return (
      <div>
        <AvForm onSubmit={this.handleSubmit} model={defaultValues}>
          {/* Radios */}
          <AvRadioGroup inline name="locationType" label="Location Type" required>
            <AvRadio label="Residential" value="home" />
            <AvRadio label="Business" value="work" />
            <AvRadio label="Awesome" value="awesome" />
          </AvRadioGroup>
          {/* Checkboxes */}
          <AvCheckboxGroup inline name="locationQualities" label="Location Qualities" required>
            <AvCheckbox label="Beautiful" value="beautiful" />
            <AvCheckbox label="Awesome" value="awesome" />
            <AvCheckbox label="Wonderful" value="wonderful" />
          </AvCheckboxGroup>
          {/* With AvField */}
          <AvField name="name" label="Name" required />
          <Row>
            <Col xs="12" sm="8">
              {/* With AvGroup AvInput and AvFeedback to build your own */}
              <AvGroup>
                <Label for="street">Street</Label>
                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                <AvInput name="location.street" id="street" required />
                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                <AvFeedback>This is an error!</AvFeedback>
              </AvGroup>
            </Col>
            <Col xs="12" sm="4">
              <AvField name="location.suite" label="Suite" required />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="5">
              <AvField name="location.city" label="City" required />
            </Col>
            <Col xs="6" sm="4">
              {/* With select and AvField */}
              <AvField type="select" name="location.state" label="State" helpMessage="This is an example. Deal with it!" required>
                <option>Something</option>
                <option>Something else</option>
                <option>Florida</option>
                <option>This is just an exmaple</option>
                <option>Not Florida</option>
              </AvField>
            </Col>
            <Col xs="6" sm="3">
              <AvField name="location.zip" label="ZIP Code" required />
            </Col>
          </Row>
          <AvGroup check>
            <AvInput type="checkbox" name="checkItOut" />
            <Label check for="checkItOut">Check it out!</Label>
          </AvGroup>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </AvForm>
        {this.state.values && <div>
          <h5>Submission values</h5>
          Invalid: {this.state.errors.join(', ')}<br />
          Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>}
      </div>
    );
  }
}
