import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Input, FormGroup, Label} from 'reactstrap';
import AvInput from './AvInput';

const radioPropTypes = Object.assign({}, AvInput.propTypes);
delete radioPropTypes.name;

export default class AvRadio extends Component {

  static contextTypes = Object.assign({}, AvInput.contextTypes, {
    Group: PropTypes.object.isRequired,
  });

  static propTypes = radioPropTypes;

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
      touched && hasError && 'is-invalid'
    );

    return (
      <FormGroup check inline={groupProps.inline} disabled={this.props.disabled || this.context.FormCtrl.isDisabled()}>
        <Input
          name={groupProps.name}
          type='radio'
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
