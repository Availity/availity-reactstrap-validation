import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    return Array.isArray(valueArr) && valueArr.length > 0 && valueArr.filter(item => item === this.props.value);
  }

  render() {
    const {
      className,
      id,
      customInput,
      ...attributes} = this.props;

    const listProps = this.context.Group.getProps();

    const touched = this.context.FormCtrl.isTouched(listProps.name);
    const hasError = this.context.FormCtrl.hasError(listProps.name);

    const classes = classNames(
      className,
      touched ? 'is-touched' : 'is-untouched',
      this.context.FormCtrl.isDirty(listProps.name) ? 'is-dirty' : 'is-pristine',
      this.context.FormCtrl.isBad(listProps.name) ? 'is-bad-input' : null,
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
          type='checkbox'
          {...attributes}
          inline={listProps.inline}
          id={id || `checkbox-${listProps.name}-${this.props.value}`}
          className={classes}
          onChange={this.onChangeHandler}
          value={this.props.value && this.props.value.toString()}
          defaultChecked={this.isDefaultChecked(listProps.value)}
          label={this.props.label}
        />
      );
    }

    return (
      <FormGroup check inline={listProps.inline} disabled={attributes.disabled || attributes.readOnly}>
        <Input
          type='checkbox'
          {...attributes}
          id={id || `checkbox-${listProps.name}-${this.props.value}`}
          className={classes}
          onChange={this.onChangeHandler}
          value={this.props.value && this.props.value.toString()}
          defaultChecked={this.isDefaultChecked(listProps.value)}
        />
        <Label check for={id || `checkbox-${listProps.name}-${this.props.value}`}>{this.props.label}</Label>
      </FormGroup>
    );
  }
}
