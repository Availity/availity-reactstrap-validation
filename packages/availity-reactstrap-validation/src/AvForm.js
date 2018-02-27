import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form } from 'reactstrap';

import AvStore from './AvStore';
import { validationProp } from './Props';

export default class AvForm extends Component {
  static childContextTypes = {
    AvStore: PropTypes.instanceOf(AvStore),
  };

  static propTypes = {
    // Style props
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    submittedClass: PropTypes.string,
    validClass: PropTypes.string,
    invalidClass: PropTypes.string,
    // store props
    validate: validationProp,
    validators: PropTypes.objectOf(PropTypes.func),
    model: PropTypes.object,
    errorMessages: PropTypes.object,
    validations: PropTypes.object,
  };

  static defaultProps = {
    tag: Form,
    submittedClass: 'av-submitted',
    validClass: 'av-valid',
    invalidClass: 'av-invalid',
  };

  constructor(props) {
    super(props);

    const { model: values, validators, errorMessages, validations } = props;

    this.state.AvStore = new AvStore({
      values,
      validators,
      errorMessages,
      validations,
    });
  }

  getChildContext() {
    return {
      AvStore: this.state.AvStore,
    };
  }

  render() {
    const {
      tag: Tag,
      className,
      submittedClass,
      validClass,
      invalidClass,
      ...attributes
    } = this.props;

    // TODO these values
    const isSumbitted = false;
    const isValid = true;
    const classesArray = [className];

    if (submittedClass && isSumbitted) {
      classesArray.push(submittedClass);
    }
    if (validClass || invalidClass) {
      classesArray.push((isValid ? validClass : invalidClass) || false);
    }
    const classes = classNames(classesArray);

    return <Tag noValidate action="#" {...attributes} className={classes} />;

    // if (Tag !== 'form' && Tag !== Form) {
    //   attributes.onKeyDown = this.handleNonFormSubmission;
    // }
    //
    // return (
    //   <Tag noValidate
    //     action="#"
    //     {...attributes}
    //     className={classes}
    //     onSubmit={this.handleSubmit}
    //   />
    // );
  }
}
