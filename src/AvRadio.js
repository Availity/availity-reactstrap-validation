import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Input, FormGroup, Label} from 'reactstrap';
import AvInput from './AvInput'

let radioPropTypes = Object.assign({}, AvInput.propTypes);
delete radioPropTypes.name;

export default class AvRadio extends AvInput {

  static contextTypes = Object.assign({}, AvInput.contextTypes, {
    Group: PropTypes.object.isRequired,
  });

  static propTypes = radioPropTypes;

  constructor (props) {
    super(props);

    this.onChangeHandler = ::this.onChangeHandler;
  }

  onChangeHandler () {
    this.context.Group.update(this.props.value);
  }

  render () {
    const {errorMessage, validate, validationEvent, state, className, tag: Tag, ...attributes} = this.props;

    const classes = classNames(
      className,
      this.context.FormCtrl.isTouched[this.props.name] ? 'av-touched' : 'av-untouched',
      this.context.FormCtrl.isDirty[this.props.name] ? 'av-dirty' : 'av-pristine',
      this.context.FormCtrl.isBad[this.props.name] ? 'av-bad-input' : null,
      this.context.FormCtrl.hasError[this.props.name] ? 'av-invalid' : 'av-valid'
    );

    const isDisabled = attributes.disabled === true;

    return (
      <FormGroup check disabled={isDisabled}>
        <Label check>
          <Input
            name={this.context.Group.name}
            type='radio'
            {...attributes}
            {...this.getValidatorProps()}
            className={classes}
            onChange={this.onChangeHandler}
            value={this.props.value}
          /> {' '}
          {this.props.label}
        </Label>
      </FormGroup>
    );
  }
}