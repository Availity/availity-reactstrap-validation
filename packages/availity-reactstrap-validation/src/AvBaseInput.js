import { Component } from 'react';
import PropTypes from 'prop-types';

import isUndefined from 'lodash/isUndefined';
import isEqual from 'lodash/isEqual';

import AvStore from './AvStore';
import { validationProp } from './Props';

class AvBaseInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    validate: validationProp,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
  };

  static contextTypes = {
    AvStore: PropTypes.instanceOf(AvStore).isRequired,
  };

  static defaultProps = {};

  state = {
    inputState: {
      touched: false,
      dirty: false,
      bad: false,
      valid: true,
      pending: false,
    },
  };

  componentWillMount() {
    // register
    this.setState(
      {
        value: this.props.value || this.getDefaultValue(),
      },
      () => {
        this.registerInput();
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      // re-rigister with new name
      this.registerInput(nextProps);
    }

    if (!isEqual(nextProps.value, this.props.value)) {
      this.context.AvStore.updateValue();
    }

    // update validations if changed
    this.checkValidationsChange(nextProps);

    // TODO: anything if default value changes?
  }

  componentWillUnmount() {
    // unregister
    this.unregisterInput();
  }

  onStoreChange(inputState) {
    this.setState({ inputState });
  }

  getDefaultValue() {
    if (!isUndefined(this.props.defaultValue)) {
      return this.props.defaultValue;
    }
    return this.context.AvStore.getDefaultValue(this.props.name);
  }

  getValidations(props = this.props) {
    // TODO build up full validation object from other props
    return props.validate;
  }

  checkValidationsChange(nextProps) {
    const hasChanged = !isEqual(nextProps.validate, this.props.validate);

    // TODO check other values that effect validations

    if (hasChanged) {
      this.updateValidaitons(nextProps);
    }
  }

  updateValidaitons(props = this.props) {
    this.context.AvStore.updateValidaitons(
      this.getValidations(props),
      props.name
    );
  }

  registerInput(props = this.props) {
    if (this.unregister) {
      this.unregisterInput();
    }
    this.unregister = this.context.AvStore.subscribe(
      props.name,
      this.onStoreChange,
      {
        state: this.state,
        validations: this.getValidations(props),
      }
    );
  }

  unregisterInput() {
    if (this.unregister) {
      this.unregister();
    }
  }
}

export default AvBaseInput;
