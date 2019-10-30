import { Component } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

const htmlValidationAttrs = [
  'min',
  'max',
  'minLength',
  'maxLength',
  'pattern',
  'required',
  'step',
];

const htmlValidationTypes = [
  'email',
  'date',
  'datetime',
  'number',
  'tel',
  'url',
  /*'range', 'month', 'week', 'time'*/ // These do not currently have validation
];

export default class AvBaseInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    validationEvent: PropTypes.oneOfType([
      PropTypes.oneOf(['', 'onInput', 'onChange', 'onBlur', 'onFocus']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['onInput', 'onChange', 'onBlur', 'onFocus'])
      ),
    ]),
    validate: PropTypes.object,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    trueValue: PropTypes.any,
    falseValue: PropTypes.any,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    state: PropTypes.bool,
    type: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
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
    trueValue: true,
    falseValue: false,
  };

  constructor(props) {
    super(props);
    this.state = { value: this.props.multiple ? [] : '' };
    this.validations = {};
    this.value = '';
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.value = this.props.value || this.getDefaultValue();
    this.setState({ value: this.value });
    this.updateValidations();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.context.FormCtrl.unregister(this);
    }
    if (nextProps.type === 'checkbox') {
      if (nextProps.checked !== this.props.checked) {
        if (nextProps.checked) {
          this.value = nextProps.trueValue;
        } else {
          this.value = nextProps.falseValue;
        }
        this.setState({ value: this.value });
      }
    } else {
      if (nextProps.multiple !== this.props.multiple) {
        this.value = nextProps.multiple ? [] : '';
        this.setState({ value: this.value });
      }
      if (nextProps.value !== this.props.value) {
        this.value = nextProps.value;
        this.setState({ value: nextProps.value });
      }
    }

    if (!isEqual(nextProps, this.props)) {
      this.updateValidations(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.context.FormCtrl.register(this);
    }
  }

  componentWillUnmount() {
    this.context.FormCtrl.unregister(this);
  }

  onKeyUpHandler(event) {
    const badInput = get(event, 'target.validity.badInput', false);
    if (badInput !== this.context.FormCtrl.isBad(this.props.name)) {
      this.context.FormCtrl.setBad(
        this.props.name,
        badInput
      );
      this.validate();
    }
    this.props.onKeyUp && this.props.onKeyUp(event);
  }

  onInputHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onInput', _value);
    !this.context.FormCtrl.isDirty(this.props.name) &&
      this.context.FormCtrl.setDirty(this.props.name);
  }

  onBlurHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onBlur', _value);
    !this.context.FormCtrl.isTouched(this.props.name) &&
      this.context.FormCtrl.setTouched(this.props.name);
  }

  onFocusHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onFocus', _value);
  }

  onChangeHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onChange', _value);
    !this.context.FormCtrl.isDirty(this.props.name) &&
      this.context.FormCtrl.setDirty(this.props.name);
  }

  getDefaultValue() {
    let defaultValue = '';

    if (this.props.type === 'checkbox') {
      if (!isUndefined(this.props.defaultChecked)) {
        return this.props.defaultChecked
          ? this.props.trueValue
          : this.props.falseValue;
      }
      defaultValue = this.props.falseValue;
    }

    if (this.props.type === 'select' && this.props.multiple) {
      defaultValue = [];
    }

    let value =
      this.props.defaultValue ||
      this.context.FormCtrl.getDefaultValue(this.props.name);

    if (this.props.type === 'checkbox' && value !== this.props.trueValue) {
      value = defaultValue;
    }

    return isUndefined(value) ? defaultValue : value;
  }

  getFieldValue(event) {
    if (this.props.type === 'checkbox') {
      return event.target.checked
        ? this.props.trueValue
        : this.props.falseValue;
    }

    if (this.props.type === 'select' && this.props.multiple) {
      /* // Something about this does not work when transpiled
      return [...event.target.options]
        .filter(({ selected }) => selected)
        .map(({ value }) => value); */
      const ret = [];
      const options = event.target.options;
      for (let i = 0; i < options.length; i++){
        if (options[i].selected){
          ret.push(options[i].value);
        }
      }
      return ret;
    }
    return event && event.target && !isUndefined(event.target.value)
      ? event.target.value
      : event;
  }

  getValidationEvent() {
    const validationEvent = this.props.validationEvent
      ? this.props.validationEvent
      : this.context.FormCtrl.getValidationEvent();
    return Array.isArray(validationEvent) ? validationEvent : [validationEvent];
  }

  getValidatorProps() {
    const validatity = this.context.FormCtrl.getInputState(this.props.name);
    const htmlValAttrs = Object.keys(this.props.validate || {})
      .filter(val => htmlValidationAttrs.indexOf(val) > -1)
      .reduce((result, item) => {
        result[item] =
          this.props.validate[item].value || this.props.validate[item];
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

    if (this.props.disabled === undefined && this.context.FormCtrl.isDisabled() !== undefined) {
      newProps.disabled = this.context.FormCtrl.isDisabled();
    }

    if (this.props.readOnly === undefined && this.context.FormCtrl.isReadOnly() !== undefined) {
      newProps.readOnly = this.context.FormCtrl.isReadOnly();
    }

    if (this.props.type === 'checkbox') {
      newProps.checked = this.value === this.props.trueValue;
    }

    if (this.props.state || (validatity && validatity.errorMessage)) {
      newProps.valid = !(validatity && validatity.errorMessage);
    }

    return newProps;
  }

  getValue() {
    return this.value;
  }

  reset() {
    this.value = this.getDefaultValue();
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({ value: this.value });
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  }

  validateEvent(eventName, _event) {
    this.setState({ value: this.value });
    if (this.getValidationEvent().indexOf(eventName) > -1) {
      this.validate();
    }
    this.props[eventName] && this.props[eventName](_event, this.value);
  }

  validate() {
    this.context.FormCtrl.validate(this.props.name);
  }

  updateValidations(props = this.props) {
    this.validations = Object.assign({}, props.validate);

    if (htmlValidationTypes.indexOf(props.type) > -1) {
      this.validations[props.type] = this.validations[props.type] || true;
    }

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

    this.context.FormCtrl && this.context.FormCtrl.register(this);
    this.validate();
  }
}
