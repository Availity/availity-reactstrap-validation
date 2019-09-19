import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import find from 'lodash/find';
import {Input, FormGroup, Label, CustomInput} from 'reactstrap';
import AvInput from './AvInput';

const checkPropTypes = Object.assign({}, AvInput.propTypes, {customInput: PropTypes.bool});
delete checkPropTypes.name;

export default class AvCheckbox extends Component {

  static contextTypes = Object.assign({}, AvInput.contextTypes, {
    Group: PropTypes.object.isRequired,
  });

  static propTypes = checkPropTypes;

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

  isDefaultChecked(valueArr) {
    return Array.isArray(valueArr) && valueArr.length > 0 && find(valueArr,item => item === this.props.value);
  }

  render() {
    const {
      className,
      id,
      customInput,
      ...attributes} = this.props;

    const groupProps = this.context.Group.getProps();

    const touched = this.context.FormCtrl.isTouched(groupProps.name);
    const hasError = this.context.FormCtrl.hasError(groupProps.name);

    const classes = classNames(
      className,
      touched ? 'is-touched' : 'is-untouched',
      this.context.FormCtrl.isDirty(groupProps.name) ? 'is-dirty' : 'is-pristine',
      this.context.FormCtrl.isBad(groupProps.name) ? 'is-bad-input' : null,
      hasError ? 'av-invalid' : 'av-valid',
      touched && hasError && 'is-invalid',
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
          type='checkbox'
          {...attributes}
          inline={groupProps.inline}
          id={id || `checkbox-${groupProps.name}-${this.props.value}`}
          className={classes}
          onChange={this.onChangeHandler}
          value={this.props.value && this.props.value.toString()}
          defaultChecked={this.isDefaultChecked(groupProps.value)}
          required={groupProps.required}
          label={this.props.label}
        />
      );
    }

    return (
      <FormGroup check inline={groupProps.inline} disabled={attributes.disabled || attributes.readOnly}>
        <Input
          name={groupProps.name}
          type='checkbox'
          {...attributes}
          id={id || `checkbox-${groupProps.name}-${this.props.value}`}
          className={classes}
          onChange={this.onChangeHandler}
          value={this.props.value && this.props.value.toString()}
          defaultChecked={this.isDefaultChecked(groupProps.value)}
          required={groupProps.required}
        />
        <Label check for={id || `checkbox-${groupProps.name}-${this.props.value}`}>{this.props.label}</Label>
      </FormGroup>
    );
  }
}
