import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';

export default class AvGroup extends Component {
  static propTypes = { ...FormGroup.propTypes };

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Group: PropTypes.object.isRequired,
    FormCtrl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { input: { props: {} } };
  }

  getChildContext() {
    this.FormCtrl = { ...this.context.FormCtrl };
    const registerValidator = this.FormCtrl.register;
    this.FormCtrl.register = input => {
      this.setState({ input });
      registerValidator(input, this.update.bind(this, input));
    };
    return {
      Group: {
        getInput: () => this.state.input,
        getInputState: ::this.getInputState,
      },
      FormCtrl: this.FormCtrl,
    };
  }

  getInputState() {
    return this.context.FormCtrl.getInputState(this.state.input.props.name);
  }

  update(input) {
    if (input && input.setState) input.setState.call(input, {});
    this.setState({});
  }

  render() {
    const validation = this.getInputState();
    const classname = classNames(this.props.className, validation.color && `text-${validation.color}`);
    return (
      <FormGroup className={classname} {...this.props} />
    );
  }
}
