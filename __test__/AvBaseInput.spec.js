import { AvBaseInput } from 'availity-reactstrap-validation';

describe('BaseInput', function() {
  beforeEach(() => {
    this.inputState = 'danger';
    this.props = {
      name: 'fieldName',
      validateEvent: '',
      validate: {},
    };
    this.context = {
      FormCtrl: {
        inputs: {},
        getDefaultValue: sinon.spy(),
        getInputState: sinon.stub().returns(this.inputState),
        hasError: {},
        isDirty: {},
        isTouched: {},
        isBad: {},
        setDirty: sinon.spy(),
        setTouched: sinon.spy(),
        setBad: sinon.spy(),
        register: sinon.spy(),
        unregister: sinon.spy(),
        validate: sinon.spy(),
        validationEvent: 'formCtrlValidationEvent',
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
  });

  describe('component will mount', () => {
    it('should get the default value', () => {
      const spy = sinon.spy(this.component, 'getDefaultValue');
      this.component.componentWillMount();
      expect(spy).to.have.been.calledOnce;
    });

    it('should set the value to the default value', () => {
      const defaultValue = 'some value';
      this.component.props.defaultValue = defaultValue;
      this.component.componentWillMount();
      expect(this.component.value).to.equal(defaultValue);
    });

    it('should set the state value to the default value', () => {
      const defaultValue = 'some value';
      this.component.props.defaultValue = defaultValue;
      this.component.componentWillMount();
      expect(this.setStateSpy).to.have.been.calledWithMatch({value: defaultValue});
    });

    it('should set the value to the value prop if provided', () => {
      const defaultValue = 'some value';
      this.component.props.value = defaultValue;
      this.component.componentWillMount();
      expect(this.component.value).to.equal(defaultValue);
    });

    it('should set the state value to the value prop if provided', () => {
      const defaultValue = 'some value';
      this.component.props.value = defaultValue;
      this.component.componentWillMount();
      expect(this.setStateSpy).to.have.been.calledWithMatch({value: defaultValue});
    });

    it('should trigger validation', () => {
      const spy = sinon.spy(this.component, 'validate');
      this.component.componentWillMount();
      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('component will receive props', () => {
    it('should do nothing if the value hasn\'t changed', () => {
      this.props.value = 123;
      const spy = sinon.spy(this.component, 'validate');
      this.component.componentWillReceiveProps(this.props);
      expect(this.setStateSpy).to.not.have.been.called;
      expect(spy).to.not.have.been.called;
    });

    describe('when the value changed', () => {
      it('should set the value to the new value', () => {
        const newValue = 2342;
        this.component.componentWillReceiveProps({value: newValue});
        expect(this.component.value).to.equal(newValue);
      });

      it('should set the state value to the default value', () => {
        const newValue = 2342;
        this.component.componentWillReceiveProps({value: newValue});
        expect(this.setStateSpy).to.have.been.calledWithMatch({value: newValue});
      });

      it('should trigger validation', () => {
        const newValue = 2342;
        const spy = sinon.spy(this.component, 'validate');
        this.component.componentWillReceiveProps({value: newValue});
        expect(spy).to.have.been.calledOnce;
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

      describe('with value',() => {
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
        })
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
    it('it should return an object', () => {
      const result = this.component.getDefaultValue();
      expect(result).to.be.an('object');
    });

    describe('for non checkbox', () => {
      it('should return "defaultValue" as the key', () => {
        const result = this.component.getDefaultValue();
        expect(result.key).to.equal('defaultValue');
      });

      it('should return the prop value based on the key', () => {
        this.props.defaultValue = 'my default';
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.not.have.been.called;
        expect(result.value).to.equal(this.props.defaultValue);
      });

      it('should return the default value from the model when the prop is not present', () => {
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.have.been.calledOnce;
        expect(result.value).to.equal('');
      });
    });

    describe('for a checkbox', () => {
      it('should return "defaultChecked" key when', () => {
        this.props.type = 'checkbox';
        const result = this.component.getDefaultValue();
        expect(result.key).to.equal('defaultChecked');
      });

      it('should return the prop value based on the key', () => {
        this.props.type = 'checkbox';
        this.props.defaultChecked = 'my default';
        const result = this.component.getDefaultValue();
        expect(this.context.FormCtrl.getDefaultValue).to.not.have.been.called;
        expect(result.value).to.equal(this.props.defaultChecked);
      });
    });
  });

  describe('on key up handler', () => {
    it('should not throw when event is undefined', () => {
      expect(this.component.onKeyUpHandler).to.not.throw();
    });

    it('should not throw when event.target is undefined', () => {
      expect(this.component.onKeyUpHandler.bind(this.component, {})).to.not.throw();
    });

    it('should not throw when event.target.validity is undefined', () => {
      expect(this.component.onKeyUpHandler.bind(this.component, {target: {}})).to.not.throw();
    });

    it('should not call setBadInput if it has not changed', () => {
      this.context.FormCtrl.isBad[this.props.name] = true;
      this.component.onKeyUpHandler({target: {validity: {badInput: true}}});
      expect(this.context.FormCtrl.setBad).to.not.have.been.called;
    });

    it('should call setBadInput if it has changed', () => {
      this.context.FormCtrl.isBad[this.props.name] = true;
      this.component.onKeyUpHandler({target: {validity: {badInput: false}}});
      expect(this.context.FormCtrl.setBad).to.have.been.calledWith(this.props.name, false);

      this.context.FormCtrl.isBad[this.props.name] = false;
      this.component.onKeyUpHandler({target: {validity: {badInput: true}}});
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
      const value = {some: 'value'};
      this.component.onInputHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = {target: {value: 'value'}};
      this.component.onInputHandler(event);
      expect(this.component.value).to.equal(event.target.value);
    });

    it('should call valitateEvent with the onInput event', () => {
      const spy = sinon.spy(this.component, 'validateEvent');
      this.component.onInputHandler('something');
      expect(spy).to.have.been.calledWith('onInput');
    });

    it('should call setTouched if the control was not previously touched', () => {
      this.context.FormCtrl.isTouched[this.props.name] = false;
      this.component.onInputHandler('something');
      expect(this.context.FormCtrl.setTouched).to.have.been.calledWith(this.props.name);
    });

    it('should not call setTouched if the control was previously touched', () => {
      this.context.FormCtrl.isTouched[this.props.name] = true;
      this.component.onInputHandler('something');
      expect(this.context.FormCtrl.setTouched).to.not.have.been.called;
    });
  });

  describe('on blur handler', () => {
    it('should set the internal value to the passed value', () => {
      const value = {some: 'value'};
      this.component.onBlurHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = {target: {value: 'value'}};
      this.component.onBlurHandler(event);
      expect(this.component.value).to.equal(event.target.value);
    });

    it('should call valitateEvent with the onInput event', () => {
      const spy = sinon.spy(this.component, 'validateEvent');
      this.component.onBlurHandler('something');
      expect(spy).to.have.been.calledWith('onBlur');
    });

    it('should call setTouched if the control was not previously touched', () => {
      this.context.FormCtrl.isTouched[this.props.name] = false;
      this.component.onBlurHandler('something');
      expect(this.context.FormCtrl.setTouched).to.have.been.calledWith(this.props.name);
    });

    it('should not call setTouched if the control was previously touched', () => {
      this.context.FormCtrl.isTouched[this.props.name] = true;
      this.component.onBlurHandler('something');
      expect(this.context.FormCtrl.setTouched).to.not.have.been.called;
    });
  });

  describe('on focus handler', () => {
    it('should set the internal value to the passed value', () => {
      const value = {some: 'value'};
      this.component.onFocusHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = {target: {value: 'value'}};
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
      const value = {some: 'value'};
      this.component.onChangeHandler(value);
      expect(this.component.value).to.equal(value);
    });

    it('should set the internal value to the passed event value', () => {
      const event = {target: {value: 'value'}};
      this.component.onChangeHandler(event);
      expect(this.component.value).to.equal(event.target.value);
    });

    it('should call valitateEvent with the onInput event', () => {
      const spy = sinon.spy(this.component, 'validateEvent');
      this.component.onChangeHandler('something');
      expect(spy).to.have.been.calledWith('onChange');
    });

    it('should call setDirty if the control was not previously touched', () => {
      this.context.FormCtrl.isDirty[this.props.name] = false;
      this.component.onChangeHandler('something');
      expect(this.context.FormCtrl.setDirty).to.have.been.calledWith(this.props.name);
    });

    it('should not call setDirty if the control was previously touched', () => {
      this.context.FormCtrl.isDirty[this.props.name] = true;
      this.component.onChangeHandler('something');
      expect(this.context.FormCtrl.setDirty).to.not.have.been.called;
    });
  });

  describe('get field value', () => {
    it('should give the value of "checked" for a checkbox', () => {
      this.props.type = 'checkbox';
      const event = {target: {checked: {}}};
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(event.target.checked);
    });

    it('should give the value of "value" for non checkboxs which have it defined', () => {
      this.props.type = 'text';
      const event = {target: {value: {}}};
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(event.target.value);
    });

    it('should give the event for non checkboxs which do not have a target', () => {
      this.props.type = 'text';
      const event = {noTarget: {value: {}}};
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(event);
    });

    it('should give the event for non checkboxs which do not have a value defined', () => {
      this.props.type = 'text';
      const event = {target: {noValue: {}}};
      const result = this.component.getFieldValue(event);
      expect(result).to.equal(event);
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

      it('should not set the state value', () => {
        this.component.validateEvent('onChange');
        expect(this.setStateSpy).to.not.have.been.called;
      });

      it('should not try to validate', () => {
        const spy = sinon.spy(this.component, 'validate');
        this.component.validateEvent('onChange');
        expect(spy).to.not.have.been.called;
      });

      it('should trigger the callback from props with the value', () => {
        this.props.onChange = sinon.spy();
        const value = {};
        this.component.value = value;
        this.component.validateEvent('onChange');
        expect(this.props.onChange).to.have.been.calledWith(value);
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
        expect(this.setStateSpy).to.have.been.calledWithMatch({value});
      });

      it('should try to validate', () => {
        const spy = sinon.spy(this.component, 'validate');
        this.component.validateEvent('onChange');
        expect(spy).to.have.been.calledOnce;
      });

      it('should trigger the callback from props with the value', () => {
        this.props.onChange = sinon.spy();
        const value = {};
        this.component.value = value;
        this.component.validateEvent('onChange');
        expect(this.props.onChange).to.have.been.calledWith(value);
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
      expect(this.setStateSpy).to.have.been.calledWithMatch({value: defaultValue});
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
      expect(this.component.getValidationEvent()).to.equal(this.props.validationEvent);
    });

    it('should return the validation event from the form control if not from props', () => {
      this.props.validationEvent = '';
      expect(this.component.getValidationEvent()).to.equal(this.context.FormCtrl.validationEvent);
    });
  });

  describe('get validator props', () => {
    it('should return an object', () => {
      expect(this.component.getValidatorProps()).to.be.an('object');
    });

    it('should not get the input state if the props do not allow it', () => {
      this.props.state = false;
      const result = this.component.getValidatorProps();
      expect(this.context.FormCtrl.getInputState).to.not.have.been.called;
      expect(result).to.not.include.keys('state');
    });

    it('should get the input state if the props allow it', () => {
      this.props.state = true;
      const result = this.component.getValidatorProps();
      expect(this.context.FormCtrl.getInputState).to.have.been.calledWith(this.props.name);
      expect(result).to.include({state: this.inputState});
    });

    it('should turn the validations in the validate prop into attrs if they are legit attrs', () => {
      this.props.validate = {
        min: {value: 6},
        required: true,
        match: {value: 'something'},
      };
      const result = this.component.getValidatorProps();
      expect(result).to.include({min: 6, required: true}).and.not.include.keys('match');
    });

    describe('returned object', () => {
      it('should have the default event handlers', () => {
        const result = this.component.getValidatorProps();
        expect(result).to.include.all.keys('onKeyUp', 'onBlur','onInput','onChange','onFocus');
      });

      it('should have the current value', () => {
        const value = 'something';
        this.component.value = value;
        const result = this.component.getValidatorProps();
        expect(result).to.include({value});
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
