import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _omit from 'lodash/omit';
import { Input, FormGroup, Label, CustomInput } from 'reactstrap';
import AvInput from './AvInput';

export default class AvRadio extends Component {

  static contextTypes = {
    ...AvInput.contextTypes,
    Group: PropTypes.object.isRequired,
  };

  static propTypes = {
    ..._omit(AvInput.propTypes, 'name'),
    customInput: PropTypes.bool,
  };

  componentDidMount() {
    this.context.FormCtrl && this.context.FormCtrl.register(this);
  }

  componentWillUnmount() {
    this.context.FormCtrl && this.context.FormCtrl.unregister(this);
  }

  onChangeHandler = (event, ...args) => {
    this.context.Group.update(event, this.props.value);
    if (this.props.onChange) {
      this.props.onChange(event, ...args);
    }
  };

  render() {
    const {
      className,
      id,
      customInput,
      ...attributes
    } = this.props;

    const groupProps = this.context.Group.getProps();

    const touched = this.context.FormCtrl.isTouched(groupProps.name);
    const hasError = this.context.FormCtrl.hasError(groupProps.name);

    const classes = classNames(
      className,
      touched ? 'is-touched' : 'is-untouched',
      this.context.FormCtrl.isDirty(groupProps.name) ? 'is-dirty' : 'is-pristine',
      this.context.FormCtrl.isBad(groupProps.name) ? 'is-bad-input' : null,
      hasError ? 'av-invalid' : 'av-valid',
      touched && hasError && 'is-invalid'
    );

    if (this.props.disabled === undefined && this.context.FormCtrl.isDisabled() !== undefined) {
      attributes.disabled = this.context.FormCtrl.isDisabled();
    }

    if (this.props.readOnly === undefined && this.context.FormCtrl.isReadOnly() !== undefined) {
      attributes.disabled = attributes.disabled || this.context.FormCtrl.isReadOnly();
    }

    if (customInput) {
      return (
        <CustomInput
          name={groupProps.name}
          type="radio"
          {...attributes}
          inline={groupProps.inline}
          id={id || `radio-${groupProps.name}-${this.props.value}`}
          className={classes}
          onChange={this.onChangeHandler}
          checked={this.props.value === groupProps.value}
          value={this.props.value && this.props.value.toString()}
          required={groupProps.required}
          label={this.props.label}
        />
      );
    }

    return (
      <FormGroup check inline={groupProps.inline} disabled={attributes.disabled || attributes.readOnly}>
        <Input
          name={groupProps.name}
          type="radio"
          {...attributes}
          id={id || `radio-${groupProps.name}-${this.props.value}`}
          className={classes}
          onChange={this.onChangeHandler}
          checked={this.props.value === groupProps.value}
          value={this.props.value && this.props.value.toString()}
          required={groupProps.required}
        />
        <Label check for={id || `radio-${groupProps.name}-${this.props.value}`}>{this.props.label}</Label>
      </FormGroup>
    );
  }
}
