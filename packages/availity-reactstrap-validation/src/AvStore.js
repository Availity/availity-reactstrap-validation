import _get from 'lodash/get';
import _set from 'lodash/set';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

class AvStore {
  // TODO: make this changeable?
  defaultValidationEvents = ['onChange', 'onInput', 'onBlur'];
  valueChangedEvents = ['onChange', 'onInput'];
  id; // the id of this level, necessary if not root? or just not used
  /*
    inputId: value
  */
  values; // store level values, used as defaults

  /* validation object structure:
    validationKey: {
      fields: [] array of fields to watch, this id ignored because always checked
      events: defaults onChange, onBlur?
      validator: fn or string, if string checks validators defined
    }
    each validation obj needs fields, events, validator
    validator accepts: fn or string key, if string key is for a known validator
    validationKey: true is shorthand for: validationKey: { validator: 'validationKey'}

    everything in validation object not fields, event, or validator will be sent to the validator fn as options
  */

  // TODO determine if should allow store level validations

  errorMessages; // storing default error messages for validator
  /*
    errorKey: string/fn
    if input has error with errorKey: true, will search here for string/fn to display
  */

  validators; // store level validator definitions
  validations; // store default validations for child inputs
  /*
    inputId: inputValidations
  */
  inputValidations = {}; // store the inputs provided validations object

  allInputValidations = {}; // store the merged defaults and defined validations
  watchers = {}; // cache which validators are watching each input

  /*
    TODO: determine what is needed all the time or not
    stateObj = {
      name: string (defaults to id),
      value: store the value of the input
      dirty: T/F, (if value has been changed by the input)
      bad: T/F (if input even has error)
      pending: T/F, (if waiting for async validations)
      valid: T/F, if has any errors
      error: {
        errorKey: T/errorMessage
      }
    }
  */
  inputs = {};
  /*
    inputId: stateObj
  */
  subscribers = {}; // store all subscribers

  constructor(options = {}) {
    const { values, validators, errorMessages, validations } = options;
    this.values = values;
    this.validators = validators;
    this.errorMessages = errorMessages;
    if (validations) {
      this.updateInputValidations(validations);
    }
  }

  subscribe(name, subscriber, options) {
    if (!name) {
      throw new Error('name is required to register');
    }

    if (!isString(name)) {
      throw new Error('name must be a string');
    }

    if (name[0] === '.') {
      throw new Error('name cannot start with .');
    }

    if (this.subscribers[name]) {
      throw new Error(`${name} is already subscribed`);
    }

    if (!isFunction(subscriber)) {
      throw new Error('must pass in subscribing function');
    }

    this.subscribers[name] = subscriber;
    this.inputs[name] = {
      touched: false,
      dirty: false,
      bad: false,
      valid: true,
      pending: false,
    };

    if (options) {
      const { state, validations, value } = options;
      if (validations) {
        this.updateInputValidations(validations, name);
      }
      if (state) {
        Object.assign(this.inputs[name], state);
      }
      if (value) {
        Object.assign(this.inputs[name], { value });
      }
    }

    return () => {
      delete this.subscribers[name];
      // update validations after subscribers gone to trigger removal
      this.updateInputValidations({}, name);
      // remove inputs last because watchers is needed for validations
      delete this.inputs[name];
    };
  }

  notifySubscriber = inputId => {
    // TODO: determine what information to provide on notification
    const state = this.getInput(inputId);
    this.subscribers[inputId](state);
  };

  updateValues = values => {
    this.values = values;
    Object.keys(this.inputs).forEach(inputId => {
      const newValue = this.getDefaultValue(inputId);
      const currentValue = this.getValue(inputId);
      if (newValue !== currentValue) {
        this.updateValue(inputId, newValue, true);
      }
    });
  };

  updateValue = (inputId, value, validate) => {
    this.updateInput(inputId, { value }, validate);
  };

  updateInput = (inputId, input, validate) => {
    Object.assign(this.inputs[inputId], input);
    if (validate) {
      this.onEvent(inputId, 'onChange');
    }
  };

  // grabs errors but adds in error messages as needed
  getErrors = inputId => {
    const errors = (this.getInput(inputId) || {}).error;
    return Object.keys(errors).reduce((output, errorKey) => {
      const error = errors[errorKey];
      if (!error) {
        return output;
      }
      // if validator returned string, return as is
      if (isString(error)) {
        output[errorKey] = error;
        return output;
      }
      // check if input has error message defined
      const inputErrorMessage = _get(this.allInputValidations, [
        inputId,
        errorKey,
        'errorMessage',
      ]);
      if (inputErrorMessage) {
        output[errorKey] = inputErrorMessage;
        return output;
      }
      // TODO: Get default error messages
      return output;
    }, {});
  };

  getDefaultValue = inputId => _get(this.values, inputId);
  getInput = inputId => _get(this.inputs, inputId);
  getValue = inputId => (this.getInput(inputId) || {}).value;

  getValues() {
    return Object.keys(this.inputs).reduce((output, inputId) => {
      _set(output, inputId, this.getValue(inputId));
      return output;
    }, {});
  }

  /*
    input event types:
    'onInput', 'onChange', 'onBlur', 'onFocus' - input events (have inputs just update state and call onInputChange?)
    inputChange - when an input object is changed, has input id changed
    validatorChange - when a validation rule changes, re-run validaitons using this rule
    errorMessageChange - if a default error message changes, so that inputs using default messages can update
    onSubmit - submit event

    events that are sent to inputs:
    inputChange, errorMessageChange

    event = eventType or {
      type: eventType
      event specific values (ex. input, validator, errorKey)
    }
  */
  onEvent(inputId, event) {
    const runningValidators = [this.validateOne(inputId, event)];
    if (this.valueChangedEvents.indexOf(event) >= 0 && this.watchers[inputId]) {
      this.watchers[inputId].forEach(watchingId => {
        runningValidators.push(this.validateOne(watchingId, event, inputId));
      });
    }
    return Promise.all(runningValidators);
  }

  // update the input validations for given inputId or for the store if no inputId given
  updateInputValidations(validations, inputId, storeValidation) {
    if (!inputId) {
      // if no input id, assume updating store validations, so each key should be an input id
      Object.keys(validations).reduce(validationId => {
        this.updateInputValidations(
          validations[validationId],
          validationId,
          true
        );
      });
      return;
    }
    let watching = [];

    if (this.subscribers[inputId]) {
      // update total validations definition for this input
      Object.assign(
        this.allInputValidations[inputId],
        validations,
        storeValidation ? this.inputValidations[inputId] : {}
      );
      // update the validation object for store/input validations
      this[storeValidation ? 'validations' : 'inputValidations'][
        inputId
      ] = validations;

      // find all inputs that this input watches
      watching = Object.keys(this.allInputValidations[inputId]).reduce(
        (output, validationKey) => {
          const validationRule = _get(this.allInputValidations, [
            inputId,
            validationKey,
          ]);
          if (validationRule.fields) {
            validationRule.fields.forEach(key => {
              if (key !== inputId && output.indexOf(key) < 0) {
                output.push(key);
              }
            });
          }
          return output;
        },
        []
      );
    } else if (this.inputValidations[inputId]) {
      // removing input id from validation
      delete this.inputValidations[inputId];
      this.allInputValidations[inputId] = _get(this.validations, inputId);
    }

    const oldWatching = _get(this.inputs, [inputId, 'watching'], []);

    oldWatching.forEach(watchingKey => {
      if (
        Array.isArray(this.watchers[watchingKey]) &&
        watching.indexOf(watchingKey) < 0
      ) {
        const newWatcher = this.watchers[watchingKey].filter(
          val => val !== inputId
        );
        if (newWatcher.length > 0) {
          this.watchers[watchingKey] = newWatcher;
        } else {
          delete this.watchers[watchingKey];
        }
      }
    });

    watching.forEach(watchingKey => {
      if (oldWatching.indexOf(watchingKey) < 0) {
        if (!this.watchers[watchingKey]) {
          this.watchers[watchingKey] = [inputId];
        } else {
          this.watchers[watchingKey].push(inputId);
        }
      }
    });
    _set(this.inputs, [inputId, 'watching'], watching);
  }

  validateOne(inputId, event, eventInput) {
    const runningValidators = [];
    const validators = _get(this.allInputValidations, inputId, {});
    this.inputs[inputId].pending = true;
    Object.keys(validators).forEach(validatorKey => {
      let validatorObj = validators[validatorKey];
      if (!validatorObj) {
        return;
      }
      if (typeof validatorObj === 'boolean') {
        validatorObj = { validator: validatorKey };
      } else if (isString(validatorObj)) {
        validatorObj = { validator: validatorObj };
      }

      // by default each validator will run for this inputId
      let shouldRun = true;
      // if an onChange or onInput event is given, and an eventInput is provided, validating this inputId for validators that watch eventInput in fields
      if (
        event &&
        eventInput &&
        eventInput !== inputId &&
        this.valueChangedEvents.indexOf(event) >= 0
      ) {
        const fields = _get(validatorObj, 'fields', []);
        shouldRun = Array.isArray(fields) && fields.indexOf(eventInput) >= 0;
      } else if (event) {
        // if not checking for an eventInput, check event against validator events
        const events = _get(
          validatorObj,
          'events',
          this.defaultValidationEvents
        );
        shouldRun = Array.isArray(events) && events.indexOf(event) >= 0;
      }

      if (shouldRun) {
        runningValidators.push(
          this.runValidation(inputId, validatorKey, validatorObj)
        );
      }
    });
    return Promise.all(runningValidators).then(results => {
      this.inputs[inputId].pending = false;
      if (results.some(val => !!val)) {
        this.notifySubscriber(inputId);
      }
    });
  }

  // run validation object, return T/F if error changed
  runValidation = async (inputId, errorKey, validatorObj) => {
    const {
      fields: omit1,
      events: omit2,
      errorMessage: omit3,
      validator,
      ...options
    } = validatorObj;

    const validatorFn = this.getValidator(validator);
    if (!validatorFn) {
      return false;
    }
    const value = this.getValue(inputId);

    const currentValid = this.inputs[inputId].error[errorKey];
    const valid = await validatorFn(value, this.getValue, options);
    this.inputs[inputId].error[errorKey] = valid;
    return valid === currentValid;
  };

  getValidator(validator) {
    if (isFunction(validator)) {
      return validator;
    }
    if (!isString(validator)) {
      return;
    }
    // TODO: check the default validators too
    return this.validators[validator];
  }
}

export default AvStore;
