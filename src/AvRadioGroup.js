import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { FormGroup } from 'reactstrap';
import classNames from 'classnames';
import AvFeedback from './AvFeedback';

const htmlValidationAttrs = ['required'];

const noop = () => {};

export default class AvRadioGroup extends Component {
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

  state = {
    invalidInputs: {},
    dirtyInputs: {},
    touchedInputs: {},
    badInputs: {},
    validate: {},
    value: '',
  };

  getChildContext() {
    if (!this.FormCtrl) {
      this.FormCtrl = { ...this.context.FormCtrl };
      this.FormCtrl.register = ::this.registerInput;
      this.FormCtrl.unregister = ::this.unregisterInput;
      this.FormCtrl.validate = noop;
    }

    const updateGroup = async (e, value) => {
      this.setState({ value });
      this.value = value;
      await this.validate();
      !this.context.FormCtrl.isTouched(this.props.name) &&
        this.context.FormCtrl.setTouched(this.props.name);
      !this.context.FormCtrl.isDirty(this.props.name) &&
        this.context.FormCtrl.setDirty(this.props.name);
      this.props.onChange && this.props.onChange(e, value);
    };

    return {
      Group: {
        getProps: () => ({
          name: this.props.name,
          inline: this.props.inline,
          required: this.props.required,
          value: this.value,
        }),
        update: updateGroup,
        getValue: () => this.value,
        getInputState: ::this.getInputState,
      },
      FormCtrl: this.FormCtrl,
    };
  }

  componentWillMount() {
    this.value = this.props.value || this.getDefaultValue().value;
    this.setState({ value: this.value });
    this.updateValidations();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.context.FormCtrl.unregister(this);
    }
    if (nextProps.value !== this.props.value) {
      this.value = nextProps.value;
      this.setState({value: nextProps.value});
    }
    if (!isEqual(nextProps, this.props)) {
      this.updateValidations(nextProps);
    }
  }

  componentWillUnmount() {
    this.context.FormCtrl.unregister(this);
  }

  getValue() {
    return this.value;
  }

  getInputState() {
    return this.context.FormCtrl.getInputState(this.props.name);
  }

  getDefaultValue() {
    const key = 'defaultValue';

    const value =
      this.props[key] ||
      this.context.FormCtrl.getDefaultValue(this.props.name) ||
      '';

    return { key, value };
  }

  async validate() {
    await this.context.FormCtrl.validate(this.props.name);
    this.updateInputs();
  }

  update() {
    this.forceUpdate();
    this.updateInputs();
  }

  _inputs = [];

  value = '';

  updateValidations(props = this.props) {
    this.validations = Object.assign({}, props.validate);

    Object.keys(props)
      .filter(val => htmlValidationAttrs.indexOf(val) > -1)
      .forEach(attr => {
        if (props[attr]) {
          this.validations[attr] = this.validations[attr] || {
            value: props[attr],
          };
        } else {
          delete this.validations[attr];
        }
      });

    this.context.FormCtrl.register(this, ::this.update);
    this.validate();
  }

  updateInputs() {
    this._inputs.forEach(input => input.forceUpdate());
  }

  reset() {
    this.value = this.getDefaultValue().value;
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({ value: this.value });
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  }

  registerInput(input) {
    if (this._inputs.indexOf(input) < 0) {
      this._inputs.push(input);
    }
  }

  unregisterInput(input) {
    this._inputs = this._inputs.filter(ipt => {
      return ipt !== input;
    });
  }

  render() {
    const legend = this.props.label ? <legend>{this.props.label}</legend> : '';
    const validation = this.getInputState();
    const {
      errorMessage: omit1,
      validate: omit2,
      validationEvent: omit3,
      state: omit4,
      label: omit5,
      required: omit6,
      inline: omit7,
      children,
      ...attributes
    } = this.props;

    const touched = this.context.FormCtrl.isTouched(this.props.name);
    const hasError = this.context.FormCtrl.hasError(this.props.name);

    const classes = classNames(
      'form-control border-0 p-0',
      touched ? 'is-touched' : 'is-untouched',
      this.context.FormCtrl.isDirty(this.props.name)
        ? 'is-dirty'
        : 'is-pristine',
      this.context.FormCtrl.isBad(this.props.name) ? 'is-bad-input' : null,
      hasError ? 'av-invalid' : 'av-valid',
      touched && hasError && 'is-invalid'
    );

    return (
      <FormGroup tag="fieldset" {...attributes}>
        {legend}
        <div className={classes}>{children}</div>
        <AvFeedback>{validation.errorMessage}</AvFeedback>
      </FormGroup>
    );
  }
}
