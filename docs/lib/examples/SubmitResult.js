import React from 'react';

export default class SubmitResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSubmit(_event, errors, values) {
    this.setState({ errors, values });
  }

  handleValidSubmit(_event, values) {
    this.setState({ values });
  }

  reset() {
    this.setState({ errors: null, values: null });
  }

  render() {
    return !this.state.values ? null : (
      <div className="mt-3">
        <h5>Submission values</h5>
        {this.state.errors && (
          <div>Invalid: {this.state.errors.join(', ')}</div>
        )}
        Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
      </div>
    );
  }
}
