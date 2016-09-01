import React, { PropTypes } from 'react';
import InputContainer from './AvInputContainer';
import AvFeedback from './AvFeedback';
import { FormGroup } from 'reactstrap';

const htmlValidationAttrs = ['required'];

export default class AvRadioGroup extends InputContainer {
  static propTypes = Object.assign({}, FormGroup.propTypes, {
    name: PropTypes.string.isRequired,
  });

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Group: PropTypes.object.isRequired,
    FormCtrl: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      invalidInputs: {},
      dirtyInputs: {},
      touchedInputs: {},
      badInputs: {},
      validate: {},
      selection: '',
    };

    this.selection = '';

    this.validations = props.validate;
  }

  componentWillMount () {
    this._inputs = {};
    this.validations = Object.assign({}, this.props.validate);

    Object.keys(this.props)
      .filter(val => htmlValidationAttrs.indexOf(val) > -1)
      .forEach(attr => {
        if (this.props[attr]) {
          this.validations[attr] = this.validations[attr] || {value: this.props[attr]};
        } else {
          delete this.validations[attr];
        }
      });

    this.context.FormCtrl.register(this);
    this.validate();
  }

  getValue () {
    return this.selection;
  }

  componentWillUnmount () {
    this.context.FormCtrl.unregister(this);
  }

  getInputState () {
    return this.context.FormCtrl.getInputState(this.props.name);
  }

  validate () {
    this.context.FormCtrl.validate(this.props.name); 
  }

  getChildContext () {
    this.FormCtrl = {...this.context.FormCtrl};
    const registerValidator = this.FormCtrl.register;
    this.FormCtrl.register = (input) => {
      // no :)
    };
    const parentValidate = this.FormCtrl.validate;
    this.FormCtrl.validate = (input) => {
      // no :)
    }

    const updateGroup = (value) => {
      this.setState({selection: value});
      this.selection = value;
      this.validate();
    }

    return {
      Group: {
        name: this.props.name,
        update: updateGroup,
        getInputState: ::this.getInputState,
      },
      FormCtrl: this.FormCtrl,
    };
  }

  renderErrorMessage (validation) {
    if (validation.errorMessage !== false) {
      return (<AvFeedback>{validation.errorMessage}</AvFeedback>);
    }

    return null;
  }

  render () {
    const legend = (this.props.label) ? (<legend>{this.props.label}</legend>) : '';
    const validation = this.getInputState();
    const errorMessage = this.renderErrorMessage(validation);

    return (
      <FormGroup tag="fieldset" {...this.props} color={validation.color}>
        {legend}
        {this.props.children}
        {errorMessage}
      </FormGroup>
    );
  }
}