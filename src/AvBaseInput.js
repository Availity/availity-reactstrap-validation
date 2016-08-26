import React, {Component, PropTypes} from 'react';
import isUndefined from 'lodash.isundefined';

const htmlValidationAttrs = ['min', 'max', 'minLength', 'maxLength', 'pattern', 'required', 'step'];
const htmlValidationTypes = [
  'email', 'date', 'datetime', 'number', 'tel', 'url',
  /*'range', 'month', 'week', 'time'*/ // These do not currently have validation
];

const getFieldValue = event =>  event && event.target && !isUndefined(event.target.value) ? event.target.value : event;

export default class AvBaseInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    validationEvent: PropTypes.oneOf([
      '', 'onInput', 'onChange', 'onBlur', 'onFocus',
    ]),
    validate: PropTypes.object,
    onKeyUp: PropTypes.func,
    onInput: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onReset: PropTypes.func,
  };

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  static defaultProps = {
    validationEvent: '',
    validate: {},
  };

  constructor (props) {
    super(props);

    this.onKeyUpHandler = ::this.onKeyUpHandler;
    this.onBlurHandler = ::this.onBlurHandler;
    this.onInputHandler = ::this.onInputHandler;
    this.onFocusHandler = ::this.onFocusHandler;
    this.onChangeHandler = ::this.onChangeHandler;
    this.validate = ::this.validate;

    this.value = '';

    this.state = {
      value: this.value,
    };

    this.validations = props.validate;
  }

  componentWillMount () {
    this.value = this.getDefaultValue().value;
    this.setState({value: this.value});
    this.updateValidations();
  }

  componentWillUpdate (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.value = nextProps.value;
      this.setState({value: nextProps.value});
      this.validate();
    }
  }

  updateValidations () {
    this.validations = Object.assign({}, this.props.validate);

    if (htmlValidationTypes.indexOf(this.props.type) > -1) {
      this.validations[this.props.type] = this.validations[this.props.type] || true;
    }

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

  componentWillUnmount () {
    this.context.FormCtrl.unregister(this);
  }

  getDefaultValue () {
    let key = 'defaultValue';

    if (this.props.type === 'checkbox') {
      key = 'defaultChecked';
    }

    const value = this.props[key] || this.context.FormCtrl.getDefaultValue(this.props.name) || '';

    return {key, value};
  }

  onKeyUpHandler(event) {
    if (event && event.target && event.target.validity && event.target.validity.badInput !== this.context.FormCtrl.isBad[this.props.name]) {
      this.context.FormCtrl.setBad(this.props.name, event.target.validity.badInput);
      this.validate();
    }
    this.props.onKeyUp && this.props.onKeyUp(event);
  }

  onInputHandler (_value) {
    this.value = getFieldValue(_value);
    this.validateEvent('onInput');
    !this.context.FormCtrl.isTouched[this.props.name] && this.context.FormCtrl.setTouched(this.props.name);
  }

  onBlurHandler (_value) {
    this.value = getFieldValue(_value);
    this.validateEvent('onBlur');
    !this.context.FormCtrl.isTouched[this.props.name] && this.context.FormCtrl.setTouched(this.props.name);
  }

  onFocusHandler (_value) {
    this.value = getFieldValue(_value);
    this.validateEvent('onFocus');
  }

  onChangeHandler (_value) {
    this.value = getFieldValue(_value);
    this.validateEvent('onChange');
    !this.context.FormCtrl.isDirty[this.props.name] && this.context.FormCtrl.setDirty(this.props.name);
  }

  validateEvent (eventName) {
    if (this.getValidationEvent() === eventName) {
      this.setState({value: this.value});
      this.validate();
    }
    this.props[eventName] && this.props[eventName](this.value);
  }

  validate () {
    this.context.FormCtrl.validate(this.props.name);
  }

  reset () {
    this.value = this.getDefaultValue().value;
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({value: this.value});
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  }

  getValidationEvent () {
    return (this.props.validationEvent)
      ? this.props.validationEvent
      : this.context.FormCtrl.validationEvent;
  }

  getValidatorProps () {
    const state = this.props.state && this.context.FormCtrl.getInputState(this.props.name);
    const htmlValAttrs = Object.keys(this.props.validate)
      .filter(val => htmlValidationAttrs.indexOf(val) > -1)
      .reduce((result, item) => {
        result[item] = this.props.validate[item].value || this.props.validate[item];
        return result;
      }, {});

    const newProps = {
      onKeyUp: this.onKeyUpHandler,
      onBlur: this.onBlurHandler,
      onInput: this.onInputHandler,
      onFocus: this.onFocusHandler,
      onChange: this.onChangeHandler,
      value: this.value,
      ...htmlValAttrs,
    };

    if (state) {
      newProps.state = state;
    }

    return newProps;
  }

  getValue () {
    return this.value;
  }
}
