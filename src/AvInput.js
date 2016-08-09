import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Input} from 'reactstrap';
import AvBaseInput from './AvBaseInput'


export default class AvInput extends AvBaseInput {
  static defaultProps = Object.assign({}, AvBaseInput.defaultProps, {
    tag: Input,
  });

  render () {
    const {errorMessage, validate, validationEvent, state, className, tag: Tag, ...attributes} = this.props;

    const classes = classNames(
      className,
      this.context.FormCtrl.isTouched[this.props.name] ? 'av-touched' : 'av-untouched',
      this.context.FormCtrl.isDirty[this.props.name] ? 'av-dirty' : 'av-pristine',
      this.context.FormCtrl.isBad[this.props.name] ? 'av-bad-input' : null,
      this.context.FormCtrl.hasError[this.props.name] ? 'av-invalid' : 'av-valid'
    );

    return (
      <Tag {...attributes}
        {...this.getValidatorProps()}
        className={classes}
        value={this.state.value}
      />
    );
  }
}
