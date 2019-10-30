import { AvBaseInput } from 'availity-reactstrap-validation';

describe('BaseInput', function() {
  let touched;
  let dirty;
  let bad;
  let error;
  let disabled;
  let readOnly;

  beforeEach(() => {
    touched = false;
    dirty = false;
    bad = false;
    error = false;
    disabled = undefined;
    readOnly = undefined;
    this.inputState = 'danger';
    this.props = {
      name: 'fieldName',
      // default props
      validateEvent: '',
      validate: {},
      trueValue: true,
      falseValue: false,
      multiple: false,
    };
    this.context = {
      FormCtrl: {
        inputs: {},
        getDefaultValue: sinon.stub(),
        getInputState: sinon.stub().returns(this.inputState),
        hasError: () => error,
        isDirty: () => dirty,
        isTouched: () => touched,
        isBad: () => bad,
        isDisabled: () => disabled,
        isReadOnly: () => readOnly,
        setDirty: sinon.spy(),
        setTouched: sinon.spy(),
        setBad: sinon.spy(),
        register: sinon.spy(),
        unregister: sinon.spy(),
        validate: sinon.spy(),
        getValidationEvent: () => 'formCtrlValidationEvent',
        parent: null,
      },
    };
    this.component = new AvBaseInput(this.props);
    this.component.context = this.context;
    this.setStateSpy = this.component.setState = sinon.spy();
  });

  describe('class constructor', () => {
    it('should set the initial value to an empty string', () => {
      expect(this.component.value).to.equal('');
    });

    it('should set the initial state value to an empty string', () => {
      expect(this.component.state.value).to.equal('');
    });

    it('should set the initial validations to an empty object', () => {
      expect(this.component.validations).to.deep.equal({});
    });

    it('should set the initial state value to an empty array if multiple is specified', () => {
      this.props.multiple = true;
      this.component.constructor(this.props);
      expect(this.component.state.value).to.be.empty;
    });
  });

  describe('component will mount', () => {
    it('should get the default value', () => {
      const spy = sinon.spy(this.component, 'getDefaultValue');
      this.component.UNSAFE_componentWillMount();
      expect(spy).to.have.been.calledOnce;
    });

    it('should set the value to the default value', () => {
      const defaultValue = 'some value';
      this.component.props.defaultValue = defaultValue;
      this.component.UNSAFE_componentWillMount();
      expect(this.component.value).to.equal(defaultValue);
    });

    it('should set the state value to the default value', () => {
      const defaultValue = 'some value';
      this.component.props.defaultValue = defaultValue;
      this.component.UNSAFE_componentWillMount();
      expect(this.setStateSpy).to.have.been.calledWithMatch({ value: defaultValue });
    });

    it('should set the value to the value prop if provided', () => {
      const defaultValue = 'some value';
      this.component.props.value = defaultValue;
      this.component.UNSAFE_componentWillMount();
      expect(this.component.value).to.equal(defaultValue);
    });

    it('should set the state value to the value prop if provided', () => {
      const defaultValue = 'some value';
      this.component.props.value = defaultValue;
      this.component.UNSAFE_componentWillMount();
      expect(this.setStateSpy).to.have.been.calledWithMatch({ value: defaultValue });
    });

    it('should trigger validation', () => {
      const spy = sinon.spy(this.component, 'validate');
      this.component.UNSAFE_componentWillMount();
      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('component will receive props', () => {
    it('should do nothing if the value has not changed', () => {
      this.props.value = 123;
      const spy = sinon.spy(this.component, 'validate');
      this.component.UNSAFE_componentWillReceiveProps(this.props);
      expect(this.setStateSpy).to.not.have.been.called;
      expect(spy).to.not.have.been.called;
    });

    describe('when the value changed', () => {
      it('should set the value to the new value', () => {
        const newValue = 2342;
        this.component.UNSAFE_componentWillReceiveProps({ value: newValue });
        expect(this.component.value).to.equal(newValue);
      });

      it('should set the state value to the default value', () => {
        const newValue = 2342;
        this.component.UNSAFE_componentWillReceiveProps({ value: newValue });
        expect(this.setStateSpy).to.have.been.calledWithMatch({ value: newValue });
      });

      it('should trigger validation', () => {
        const newValue = 2342;
        const spy = sinon.spy(this.component, 'validate');
        this.component.UNSAFE_componentWillReceiveProps({ value: newValue });
        expect(spy).to.have.been.calledOnce;
      });

      it('should reset the value if multiple has changed from false to true', () => {
        this.props.multiple = false;
        this.component.UNSAFE_componentWillReceiveProps({multiple: true});
        expect(this.component.value).to.be.empty;
        expect(this.component.state.value).to.be.empty;
      });

      it('should reset the value if multiple has changed from true to false', () => {
        this.props.multiple = true;
        this.component.UNSAFE_componentWillReceiveProps({multiple: false});
        expect(this.component.value).to.equal('');
      });
    });

    describe('when it is a checkbox', () => {
      describe('when the checked prop changes', () => {
        it('should set the value to the trueValue when the next props checked prop is true', () => {
          this.props.checked = false;
          this.component.UNSAFE_componentWillReceiveProps({
            type: 'checkbox',
            checked: true,
            trueValue: true,
            falseValue: false,
          });
          expect(this.component.value).to.equal(this.props.trueValue);
        });

        it('should set the value to the falseValue when the next props checked prop is false', () => {
          this.props.checked = true;
          this.component.UNSAFE_componentWillReceiveProps({
            type: 'checkbox',
            checked: false,
            trueValue: true,
            falseValue: false,
          });
          expect(this.component.value).to.equal(this.props.falseValue);
        });

        it('should set the state to the new value', () => {
          this.props.checked = false;
          this.component.UNSAFE_componentWillReceiveProps({
            type: 'checkbox',
            checked: true,
            trueValue: true,
            falseValue: false,
          });
          expect(this.setStateSpy).to.have.been.calledWithMatch({ value: this.props.trueValue });
        });
      });

      describe('when the checked prop changes', () => {
        it('should not set the state', () => {
          this.props.checked = true;
          this.component.UNSAFE_componentWillReceiveProps({
            type: 'checkbox',
            checked: true,
            trueValue: true,
            falseValue: false,
          });
          expect(this.setStateSpy).to.not.have.been.called;
        });
      });
    });
  });

  describe('update validations', () => {
    it('should register the component', () => {
      this.component.updateValidations();
      expect(this.context.FormCtrl.register).to.have.been.calledWith(this.component);
    });

    it('should trigger validation', () => {
      const spy = sinon.spy(this.component, 'validate');
      this.component.updateValidations();
      expect(spy).to.have.been.calledOnce;
    });

    it('should replace the current validations', () => {
      const originalValidations = this.component.validations;
      this.component.updateValidations();
      expect(this.component.validations).to.not.equal(originalValidations);
    });

    describe('HTML validation types', () => {
      it('should add validators to the list which when the type can trigger a validation', () => {
        this.component.props.type = 'date';
        this.component.updateValidations();
        expect(this.component.validations).to.have.property('date', true);
      });

      it('should not add validators to the list which when the type can trigger a validation', () => {
        this.component.props.type = 'text';
        this.component.updateValidations();
        expect(this.component.validations).to.not.have.property('text');
      });
    });

    describe('HTML validation attributes', () => {
      describe('boolean', () => {
        it('should add validators to the list which when the attribute can trigger a validation', () => {
          this.component.props.required = true;
          this.component.updateValidations();
          expect(this.component.validations).to.have.deep.property('required.value', true);
        });

        it('should not add validators to the list which when the attribute can trigger a validation', () => {
          this.component.props.disabled = true;
          this.component.updateValidations();
          expect(this.component.validations).to.not.have.property('disabled');
        });
      });

      describe('with value', () => {
        it('should add validators to the list which when the attribute can trigger a validation', () => {
          this.component.props.min = 6;
          this.component.props.max = 12;
          this.component.updateValidations();
          expect(this.component.validations).to.have.deep.property('min.value', 6);
          expect(this.component.validations).to.have.deep.property('max.value', 12);
        });

        it('should not add validators to the list when the attribute can trigger a validation', () => {
          this.component.props.value = 'something';
          this.component.updateValidations();
          expect(this.component.validations).to.not.have.property('value');
        });

        it('should remove validators from the list when the prop is falsey', () => {
          this.component.props.required = false;
          this.component.updateValidations();
          expect(this.component.validations).to.not.have.property('required');
        });
      });
    });
  });

  describe('component will ummount', () => {
    it('should unregister the component', () => {
      this.component.componentWillUnmount();
      expect(this.context.FormCtrl.unregister).to.have.been.calledOnce;
    });
  });

  describe('get default value', () => {
    describe('for non checkbox', () => {
      it('should return the prop value based on the key', () => {
        this.props.defaultValue = 'my default';
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.not.have.been.called;
        expect(result).to.equal(this.props.defaultValue);
      });

      it('should return the default value from the model when the prop is not present', () => {
        const defaultValue = 'something';
        this.context.FormCtrl.getDefaultValue.returns(defaultValue);
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.have.been.calledOnce;
        expect(result).to.equal(defaultValue);
      });

      it('should return and empty string when the default value from the model and the prop are not present', () => {
        this.context.FormCtrl.getDefaultValue.returns(undefined);
        const result = this.component.getDefaultValue();
        expect(result).to.equal('');
      });
    });

    describe('for select', () => {
      it('should return empty array', () => {
        this.props.type = 'select';
        this.props.multiple = true;
        const result = this.component.getDefaultValue();
        expect(result).to.be.empty;
      });
    });

    describe('for a checkbox', () => {
      it('should return the trueValue prop when defaultChecked is true', () => {
        this.props.type = 'checkbox';
        this.props.defaultChecked = true;
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.not.have.been.called;
        expect(result).to.equal(this.props.trueValue);
      });

      it('should return the falseValue prop when defaultChecked is false', () => {
        this.props.type = 'checkbox';
        this.props.defaultChecked = false;
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.not.have.been.called;
        expect(result).to.equal(this.props.falseValue);
      });

      it('should return the default value from the model when the defaultChecked is not present', () => {
        this.props.type = 'checkbox';
        const defaultValue = 'something';
        this.props.trueValue = defaultValue;
        this.context.FormCtrl.getDefaultValue.returns(defaultValue);
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.have.been.calledOnce;
        expect(result).to.equal(defaultValue);
      });

      it('should return the falseValue when the model and the defaultChecked are not present', () => {
        this.props.type = 'checkbox';
        this.context.FormCtrl.getDefaultValue.returns(undefined);
        const result = this.component.getDefaultValue();
        expect(result).to.equal(this.props.falseValue);
      });

      it('should return the falseValue when there is a value that is not the trueValue', () => {
        this.props.type = 'checkbox';
        this.context.FormCtrl.getDefaultValue.returns('something else');
        const result = this.component.getDefaultValue();
        expect(result).to.equal(this.props.falseValue);
      });
    });

  });

  describe('on key up handler', () => {
    it('should not throw when event is undefined', () => {
      expect(this.component.onKeyUpHandler).to.not.throw();
    });

    it('should not throw when event.target is undefined', () => {
      expect(this.component.onKeyUpHandler.bind(this.component, {})).to.not.throw();
      expect(this.context.FormCtrl.setBad).to.not.have.been.called;
    });

    it('should not throw when event.target.validity is undefined', () => {
      expect(this.component.onKeyUpHandler.bind(this.component, { target: {} })).to.not.throw();
      expect(this.context.FormCtrl.setBad).to.not.have.been.called;
    });

    it('should not set badInput to true event.target.validity.badInput is undefined', () => {
      expect(this.component.onKeyUpHandler.bind(this.component, { target: { validity: {} } })).to.not.throw();
      expect(this.context.FormCtrl.setBad).to.not.have.been.called;
    });

    it('should not call setBadInput if it has not changed', () => {
      bad = true;
      this.component.onKeyUpHandler({ target: { validity: { badInput: true } } });
      expect(this.context.FormCtrl.setBad).to.not.have.been.called;
    });

    it('should call setBadInput if it has changed', () => {
      bad = true;
      this.component.onKeyUpHandler({ target: { validity: {} } });
      expect(this.context.FormCtrl.setBad).to.have.been.calledWith(this.props.name, false);

      bad = true;
      this.component.onKeyUpHandler({ target: { validity: { badInput: false } } });
      expect(this.context.FormCtrl.setBad).to.have.been.calledWith(this.props.name, false);

      bad = false;
      this.component.onKeyUpHandler({ target: { validity: { badInput: true } } });
      expect(this.context.FormCtrl.setBad).to.have.been.calledWith(this.props.name, true);
    });

    it('should trigger the callback prop with the event if present', () => {
      this.props.onKeyUp = sinon.spy();
      const event = {};
      this.component.onKeyUpHandler(event);
      expect(this.props.onKeyUp).to.have.been.calledWith(event);
    });
  });

  describe('on input handler', () => {
    it('should set the internal value to the passed value', () => {
      const value = { some: 'value' };
      this.component.onInputHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = { target: { value: 'value' } };
      this.component.onInputHandler(event);
      expect(this.component.value).to.equal(event.target.value);
    });

    it('should call valitateEvent with the onInput event', () => {
      const spy = sinon.spy(this.component, 'validateEvent');
      this.component.onInputHandler('something');
      expect(spy).to.have.been.calledWith('onInput');
    });

    it('should call setDirty if the control was not previously dirty', () => {
      dirty = false;
      this.component.onInputHandler('something');
      expect(this.context.FormCtrl.setDirty).to.have.been.calledWith(this.props.name);
    });

    it('should not call setDirty if the control was previously dirty', () => {
      dirty = true;
      this.component.onInputHandler('something');
      expect(this.context.FormCtrl.setDirty).to.not.have.been.called;
    });
  });

  describe('on blur handler', () => {
    it('should set the internal value to the passed value', () => {
      const value = { some: 'value' };
      this.component.onBlurHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = { target: { value: 'value' } };
      this.component.onBlurHandler(event);
      expect(this.component.value).to.equal(event.target.value);
    });

    it('should call valitateEvent with the onInput event', () => {
      const spy = sinon.spy(this.component, 'validateEvent');
      this.component.onBlurHandler('something');
      expect(spy).to.have.been.calledWith('onBlur');
    });

    it('should call setTouched if the control was not previously touched', () => {
      touched = false;
      this.component.onBlurHandler('something');
      expect(this.context.FormCtrl.setTouched).to.have.been.calledWith(this.props.name);
    });

    it('should not call setTouched if the control was previously touched', () => {
      touched = true;
      this.component.onBlurHandler('something');
      expect(this.context.FormCtrl.setTouched).to.not.have.been.called;
    });
  });

  describe('on focus handler', () => {
    it('should set the internal value to the passed value', () => {
      const value = { some: 'value' };
      this.component.onFocusHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = { target: { value: 'value' } };
      this.component.onFocusHandler(event);
      expect(this.component.value).to.equal(event.target.value);
    });

    it('should call valitateEvent with the onInput event', () => {
      const spy = sinon.spy(this.component, 'validateEvent');
      this.component.onFocusHandler('something');
      expect(spy).to.have.been.calledWith('onFocus');
    });
  });

  describe('on change handler', () => {
    it('should set the internal value to the passed value', () => {
      const value = { some: 'value' };
      this.component.onChangeHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = { target: { value: 'value' } };
      this.component.onChangeHandler(event);
      expect(this.component.value).to.equal(event.target.value);
    });

    it('should call valitateEvent with the onChange event', () => {
      const spy = sinon.spy(this.component, 'validateEvent');
      this.component.onChangeHandler('something');
      expect(spy).to.have.been.calledWith('onChange');
    });

    it('should call setDirty if the control was not previously touched', () => {
      dirty = false;
      this.component.onChangeHandler('something');
      expect(this.context.FormCtrl.setDirty).to.have.been.calledWith(this.props.name);
    });

    it('should not call setDirty if the control was previously touched', () => {
      dirty = true;
      this.component.onChangeHandler('something');
      expect(this.context.FormCtrl.setDirty).to.not.have.been.called;
    });
  });

  describe('get field value', () => {
    it('should give `true` for a checkbox when it is checked and not trueValue is defined', () => {
      this.props.type = 'checkbox';
      const event = { target: { checked: true } };
      const result = this.component.getFieldValue(event);
      expect(result).to.be.true;
    });

    it('should give `false` for a checkbox when it is not checked and not falseValue is defined', () => {
      this.props.type = 'checkbox';
      const event = { target: { checked: false } };
      const result = this.component.getFieldValue(event);
      expect(result).to.be.false;
    });

    it('should give the value of the "trueValue" props for a checkbox when it is checked', () => {
      this.props.type = 'checkbox';
      this.props.trueValue = {};
      const event = { target: { checked: true } };
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(this.props.trueValue);
    });

    it('should give the value of the "falseValue" props for a checkbox when it is not checked', () => {
      this.props.type = 'checkbox';
      this.props.falseValue = {};
      const event = { target: { checked: false } };
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(this.props.falseValue);
    });

    it('should give the value of "value" for non checkboxs which have it defined', () => {
      this.props.type = 'text';
      const event = { target: { value: {} } };
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(event.target.value);
    });

    it('should give the event for non checkboxs which do not have a target', () => {
      this.props.type = 'text';
      const event = { noTarget: { value: {} } };
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(event);
    });

    it('should give the event for non checkboxs which do not have a value defined', () => {
      this.props.type = 'text';
      const event = { target: { noValue: {} } };
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(event);
    });

    it('should give the selected options', () => {
      this.props.type = 'select';
      this.props.multiple = true;
      const event = { target: { options: [ { value: 'selected', selected: true }, { value: 'notSelected', selected: false } ] } };
      const result = this.component.getFieldValue(event);
      expect(result).to.deep.equal([ 'selected' ]);
    });
  });

  describe('validate event', () => {
    it('should use getValidationEvent to get the validation event', () => {
      const spy = sinon.spy(this.component, 'getValidationEvent');
      this.component.validateEvent('onChange');
      expect(spy).to.have.been.calledOnce;
    });

    describe('when the event name does not match', () => {
      beforeEach(() => {
        this.props.validationEvent = 'noMatch';
      });

      it('should set the state value', () => {
        this.component.validateEvent('onChange');
        expect(this.setStateSpy).to.have.been.called;
      });

      it('should not try to validate', () => {
        const spy = sinon.spy(this.component, 'validate');
        this.component.validateEvent('onChange');
        expect(spy).to.not.have.been.called;
      });

      it('should trigger the callback from props with the original event and the value', () => {
        this.props.onChange = sinon.spy();
        const value = {};
        const originalEvent = {};
        this.component.value = value;
        this.component.validateEvent('onChange', originalEvent);
        expect(this.props.onChange).to.have.been.calledWith(originalEvent, value);
      });
    });

    describe('when the event name does match', () => {
      beforeEach(() => {
        this.props.validationEvent = 'onChange';
      });

      it('should set the state value', () => {
        const value = {};
        this.component.value = value;
        this.component.validateEvent('onChange');
        expect(this.setStateSpy).to.have.been.calledWithMatch({ value });
      });

      it('should try to validate', () => {
        const spy = sinon.spy(this.component, 'validate');
        this.component.validateEvent('onChange');
        expect(spy).to.have.been.calledOnce;
      });

      it('should trigger the callback from props with the value', () => {
        this.props.onChange = sinon.spy();
        const value = {};
        const originalEvent = {};
        this.component.value = value;
        this.component.validateEvent('onChange', originalEvent);
        expect(this.props.onChange).to.have.been.calledWith(originalEvent, value);
      });
    });
  });

  describe('validate', () => {
    it('should call validate on the form control passing the name of the field', () => {
      this.component.validate();
      expect(this.context.FormCtrl.validate).to.have.been.calledWith(this.props.name);
    });
  });

  describe('reset', () => {
    it('should set the internal value to the default value', () => {
      const defaultValue = 'some value';
      this.component.props.defaultValue = defaultValue;
      this.component.reset();
      expect(this.component.value).to.equal(defaultValue);
    });

    it('should remove dirty', () => {
      this.component.reset();
      expect(this.context.FormCtrl.setDirty).to.have.been.calledWith(this.props.name, false);
    });

    it('should remove toucehd', () => {
      this.component.reset();
      expect(this.context.FormCtrl.setTouched).to.have.been.calledWith(this.props.name, false);
    });

    it('should remove bad input', () => {
      this.component.reset();
      expect(this.context.FormCtrl.setBad).to.have.been.calledWith(this.props.name, false);
    });

    it('should set the state value to the default value', () => {
      const defaultValue = 'some value';
      this.component.props.defaultValue = defaultValue;
      this.component.reset();
      expect(this.setStateSpy).to.have.been.calledWithMatch({ value: defaultValue });
    });

    it('should trigger validation', () => {
      const spy = sinon.spy(this.component, 'validate');
      this.component.reset();
      expect(spy).to.have.been.calledOnce;
    });

    it('should trigger the callback from props with the [default] value', () => {
      const defaultValue = 'some value';
      this.component.props.defaultValue = defaultValue;
      this.props.onReset = sinon.spy();
      this.component.reset();
      expect(this.props.onReset).to.have.been.calledWith(defaultValue);
    });
  });

  describe('get validation event', () => {
    it('should return the validation event pass via props if present', () => {
      this.props.validationEvent = 'myEvent';
      expect(this.component.getValidationEvent()).to.eql([this.props.validationEvent]);
    });

    it('should return the validation event from the form control if not from props', () => {
      this.props.validationEvent = '';
      expect(this.component.getValidationEvent()).to.eql([this.context.FormCtrl.getValidationEvent()]);
    });
  });

  describe('get validator props', () => {
    it('should return an object', () => {
      expect(this.component.getValidatorProps()).to.be.an('object');
    });

    it('should turn the validations in the validate prop into attrs if they are legit attrs', () => {
      this.props.validate = {
        min: { value: 6 },
        required: true,
        match: { value: 'something' },
      };
      const result = this.component.getValidatorProps();
      expect(result).to.include({ min: 6, required: true }).and.not.include.keys('match');
    });

    describe('returned object', () => {
      it('should have the default event handlers', () => {
        const result = this.component.getValidatorProps();
        expect(result).to.include.all.keys('onKeyUp', 'onBlur', 'onInput', 'onChange', 'onFocus');
      });

      it('should have the current value', () => {
        const value = 'something';
        this.component.value = value;
        const result = this.component.getValidatorProps();
        expect(result).to.include({ value });
      });

      it('should have disabled if AvForm disabled is set', () => {
        const undefinedResult = this.component.getValidatorProps();
        expect(undefinedResult).to.not.have.key('disabled');
        disabled = true;
        const trueResult = this.component.getValidatorProps();
        expect(trueResult).to.include({ disabled });
        disabled = false;
        const falseResult = this.component.getValidatorProps();
        expect(falseResult).to.include({ disabled });
      });

      it('should not have disabled if input disabled is set (false)', () => {
        this.props.disabled = false;
        const undefinedResult = this.component.getValidatorProps();
        expect(undefinedResult).to.not.have.key('disabled');
        disabled = true;
        const trueResult = this.component.getValidatorProps();
        expect(trueResult).to.not.have.key('disabled');
        disabled = false;
        const falseResult = this.component.getValidatorProps();
        expect(falseResult).to.not.have.key('disabled');
      });

      it('should not have disabled if input disabled is set (true)', () => {
        this.props.disabled = true;
        const undefinedResult = this.component.getValidatorProps();
        expect(undefinedResult).to.not.have.key('disabled');
        disabled = true;
        const trueResult = this.component.getValidatorProps();
        expect(trueResult).to.not.have.key('disabled');
        disabled = false;
        const falseResult = this.component.getValidatorProps();
        expect(falseResult).to.not.have.key('disabled');
      });

      it('should have readOnly if AvForm readOnly is set', () => {
        const undefinedResult = this.component.getValidatorProps();
        expect(undefinedResult).to.not.have.key('readOnly');
        readOnly = true;
        const trueResult = this.component.getValidatorProps();
        expect(trueResult).to.include({ readOnly });
        readOnly = false;
        const falseResult = this.component.getValidatorProps();
        expect(falseResult).to.include({ readOnly });
      });

      it('should not have readOnly if input readOnly is set (false)', () => {
        this.props.readOnly = false;
        const undefinedResult = this.component.getValidatorProps();
        expect(undefinedResult).to.not.have.key('readOnly');
        readOnly = true;
        const trueResult = this.component.getValidatorProps();
        expect(trueResult).to.not.have.key('readOnly');
        readOnly = false;
        const falseResult = this.component.getValidatorProps();
        expect(falseResult).to.not.have.key('readOnly');
      });

      it('should not have readOnly if input readOnly is set (true)', () => {
        this.props.readOnly = true;
        const undefinedResult = this.component.getValidatorProps();
        expect(undefinedResult).to.not.have.key('readOnly');
        readOnly = true;
        const trueResult = this.component.getValidatorProps();
        expect(trueResult).to.not.have.key('readOnly');
        readOnly = false;
        const falseResult = this.component.getValidatorProps();
        expect(falseResult).to.not.have.key('readOnly');
      });

      describe('when a checkbox', () => {
        it('should set the checked attribute to true when the value matches the trueValue', () => {
          this.props.type = 'checkbox';
          this.props.trueValue = 'yes';
          this.component.value = 'yes';
          const result = this.component.getValidatorProps();
          expect(result.checked).to.be.true;
        });

        it('should set the checked attribute to false when the value does not match the trueValue', () => {
          this.props.type = 'checkbox';
          this.props.trueValue = 'yes';
          this.component.value = true;
          const result = this.component.getValidatorProps();
          expect(result.checked).to.be.false;
        });
      });
    });
  });

  describe('get value', () => {
    it('should return the current internal value', () => {
      const value = {};
      this.component.value = value;
      expect(this.component.getValue()).to.equal(value);
    });
  });
});
