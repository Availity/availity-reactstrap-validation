import React from 'react';
import {shallow} from 'enzyme';
import {AvForm, AvValidator} from 'availity-reactstrap-validation';
import {Form} from 'reactstrap';

describe('AvForm', function () {
  it('should render a "Form" by default', () => {
    const wrapper = shallow(<AvForm />);
    expect(wrapper.type()).to.equal(Form);
  });

  it('should allow the tag to be overridden', () => {
    const wrapper = shallow(<AvForm tag="form" />);
    expect(wrapper.type()).to.equal('form');
  });

  it('should add onKeyDown event handler when the tag is not a form', () => {
    const wrapper = shallow(<AvForm tag="div" />);
    expect(wrapper.prop('onKeyDown')).to.be.a('function');
  });

  it('should add the no validate attribute to prevent browser validation', () => {
    const wrapper = shallow(<AvForm />);
    expect(wrapper.prop('noValidate')).to.be.true;
  });

  it('should add onSubmit event handler', () => {
    const wrapper = shallow(<AvForm />);
    expect(wrapper.prop('onSubmit')).to.be.a('function');
  });

  it('should add the action attribute', () => {
    const wrapper = shallow(<AvForm />);
    expect(wrapper.prop('action')).to.equal('#');
  });

  it('should render "av-valid" when the form is valid', () => {
    const wrapper = shallow(<AvForm />);
    expect(wrapper.hasClass('av-valid')).to.be.true;
  });

  it('should not render "av-invalid" when the form is valid', () => {
    const wrapper = shallow(<AvForm />);
    expect(wrapper.hasClass('av-invalid')).to.be.false;
  });

  it('should render "av-invalid" when the form is invalid', () => {
    const wrapper = shallow(<AvForm />);
    wrapper.setState({invalidInputs: ['something']});
    expect(wrapper.hasClass('av-invalid')).to.be.true;
  });

  it('should not render "av-valid" when the form is imvalid', () => {
    const wrapper = shallow(<AvForm />);
    wrapper.setState({invalidInputs: ['something']});
    expect(wrapper.hasClass('av-valid')).to.be.false;
  });

  it('should not render "av-submitted" when the form has not had a submission attempt', () => {
    const wrapper = shallow(<AvForm />);
    expect(wrapper.hasClass('av-submitted')).to.be.false;
  });

  it('should render "av-submitted" when the form has had a submission attempt', () => {
    const wrapper = shallow(<AvForm />);
    wrapper.setState({submitted: true});
    expect(wrapper.hasClass('av-submitted')).to.be.true;
  });

  it('should allow additional classNames',() => {
    const wrapper = shallow(<AvForm className="yo" />);
    expect(wrapper.hasClass('yo')).to.be.true;
  });

  it('should allow additional props to be passed to the tag',() => {
    const wrapper = shallow(<AvForm inline />);
    expect(wrapper.prop('inline')).to.be.true;
  });

  describe('component constructor', () => {
    it('should initialize the state', () => {
      const wrapper = shallow(<AvForm />);
      expect(wrapper.state().invalidInputs).to.eql({});
      expect(wrapper.state().dirtyInputs).to.eql({});
      expect(wrapper.state().touchedInputs).to.eql({});
      expect(wrapper.state().badInputs).to.eql({});
    });
  });

  describe('non form submission', () => {
    it('should call the onKeyDown callback from props', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<AvForm tag="div" onKeyDown={spy} />);
      const event = {};
      wrapper.simulate('keyDown', event);
      expect(spy).to.have.been.calledWith(event);
    });

    it('should not care when onKeyDown callback was not provided', () => {
      const wrapper = shallow(<AvForm tag="div" />);
      const event = {};
      expect(wrapper.simulate.bind(wrapper, 'keyDown', event)).to.not.throw();
    });

    it('should not handle the event if the callback returns false', () => {
      const wrapper = shallow(<AvForm tag="div" onKeyDown={() => false} />);
      const event = {
        type: 'keydown',
        which: 13,
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
      };
      const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
      wrapper.simulate('keyDown', event);
      expect(event.stopPropagation).to.not.have.been.called;
      expect(event.preventDefault).to.not.have.been.called;
      expect(spy).to.not.have.been.called;
    });

    it('should handle the event if the callback does not explicitly return false', () => {
      const wrapper = shallow(<AvForm tag="div" />);
      const event = {
        type: 'keydown',
        which: 13,
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
      };
      const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
      wrapper.simulate('keyDown', event);
      expect(event.stopPropagation).to.have.been.called;
      expect(event.preventDefault).to.have.been.called;
      expect(spy).to.have.been.calledWith(event);
    });

    it('should handle the event with the keyCode of 13', () => {
      const wrapper = shallow(<AvForm tag="div" />);
      const event = {
        type: 'keydown',
        keyCode: 13,
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
      };
      const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
      wrapper.simulate('keyDown', event);
      expect(event.stopPropagation).to.have.been.called;
      expect(event.preventDefault).to.have.been.called;
      expect(spy).to.have.been.calledWith(event);
    });

    it('should handle the event with the key of "Enter"', () => {
      const wrapper = shallow(<AvForm tag="div" />);
      const event = {
        type: 'keydown',
        key: 'Enter',
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
      };
      const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
      wrapper.simulate('keyDown', event);
      expect(event.stopPropagation).to.have.been.called;
      expect(event.preventDefault).to.have.been.called;
      expect(spy).to.have.been.calledWith(event);
    });

    it('should handle the event with the "which" of 13', () => {
      const wrapper = shallow(<AvForm tag="div" />);
      const event = {
        type: 'keydown',
        which: 13,
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
      };
      const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
      wrapper.simulate('keyDown', event);
      expect(event.stopPropagation).to.have.been.called;
      expect(event.preventDefault).to.have.been.called;
      expect(spy).to.have.been.calledWith(event);
    });

    it('should not handle the event with the where the type is not "keydown"', () => {
      const wrapper = shallow(<AvForm tag="div" />);
      const event = {
        type: 'keypress',
        which: 13,
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
      };
      const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
      wrapper.simulate('keyDown', event);
      expect(event.stopPropagation).to.not.have.been.called;
      expect(event.preventDefault).to.not.have.been.called;
      expect(spy).to.not.have.been.called;
    });
  });

  describe('form submission', () => {
    it('should prevent default when event is passed', () => {
      const wrapper = shallow(<AvForm />);
      const event = {
        type: 'submit',
        preventDefault: sinon.spy(),
      };
      wrapper.simulate('submit', event);
      expect(event.preventDefault).to.have.been.calledOnce;
    });

    it('should not care if no event is passed', () => {
      const wrapper = shallow(<AvForm />);
      expect(wrapper.simulate.bind(wrapper,'submit')).to.not.throw();
    });

    it('should get all of the values', () =>{
      const wrapper = shallow(<AvForm />);
      const getValuesSpy = sinon.spy(wrapper.instance(), 'getValues');
      wrapper.simulate('submit');
      expect(getValuesSpy).to.have.been.calledOnce;
    });

    it('should pass the values to validateAll', () =>{
      const wrapper = shallow(<AvForm />);
      const instance = wrapper.instance();
      instance._inputs.input = {getValue: () => 'value'};
      const spy = sinon.spy(instance, 'validateAll');
      wrapper.simulate('submit');
      expect(spy).to.have.been.calledWithMatch({input: 'value'});
    });

    it('should mark all of the inputs as touched', () => {
      const wrapper = shallow(<AvForm />);
      const spy = sinon.spy(wrapper.instance(), 'setTouched');
      const instance = wrapper.instance();
      instance._inputs.input = {getValue: () => 'value'};
      return instance.handleSubmit().then(() => {
        expect(spy).to.have.been.calledWithMatch(Object.keys(instance._inputs));
      });
    });

    it('should call the onSubmit callback from props with the event, errors, and values', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<AvForm onSubmit={spy} />);
      const instance = wrapper.instance();
      const event = {type: 'submit'};
      instance._inputs.input = {getValue: () => 'value'};
      instance._inputs.invalidInput = {getValue: () => ''};
      const errors = ['invalidInput'];
      instance.validateAll = sinon.stub().returns({isValid: false, errors});
      return instance.handleSubmit(event).then(() => {
        expect(spy).to.have.been.calledWithMatch(event, errors, {input: 'value', invalidInput: ''});
      });
    });

    it('should call the onValidSubmit callback from props with the event and values when form is valid', () => {
      const spy = sinon.spy();
      const invalidSpy = sinon.spy();
      const wrapper = shallow(<AvForm onValidSubmit={spy} onInvalidSubmit={invalidSpy} />);
      const instance = wrapper.instance();
      const event = {type: 'submit'};
      instance._inputs.input = {getValue: () => 'value'};

      return instance.handleSubmit(event).then(() => {
        expect(spy).to.have.been.calledWithMatch(event, { input: 'value' });
        expect(invalidSpy).to.not.have.been.called;
      });
    });

    it('should call the onInvalidSubmit callback from props with the event, errors, and values when the form is invalid', () => {
      const spy = sinon.spy();
      const invalidSpy = sinon.spy();
      const wrapper = shallow(<AvForm onValidSubmit={spy} onInvalidSubmit={invalidSpy} />);
      const instance = wrapper.instance();
      const event = {type: 'submit'};
      instance._inputs.input = {getValue: () => 'value'};
      instance._inputs.invalidInput = {getValue: () => ''};
      const errors = ['invalidInput'];
      instance.validateAll = sinon.stub().returns({isValid: false, errors})

      return instance.handleSubmit(event).then(() => {
        expect(spy).to.not.have.been.called;
        expect(invalidSpy).to.have.been.calledWithMatch(event, errors, { input: 'value', invalidInput: '' });
      });
    });

    it('should set the state to be submitted', () => {
      const wrapper = shallow(<AvForm />);
      const instance = wrapper.instance();
      expect(wrapper.state('submitted')).to.be.false;

      return instance.handleSubmit().then(() => {
        expect(wrapper.state('submitted')).to.be.true;
      });
    });
  });

  describe('instance functions', () => {
    beforeEach(() => {
      this.wrapper = shallow(<AvForm />);
      this.instance = this.wrapper.instance();
    });

    describe('register input', () => {
      it('should get the validations from compileValidationRules', () => {
        const spy = sinon.spy(this.instance, 'compileValidationRules');
        const input = {props: {name: 'myInput'}, validations: {}};
        this.instance.registerInput(input);
        expect(spy).to.have.been.calledWith(input, input.validations);
      });

      it('should add the input validators', () => {
        const input = {props: {name: 'myInput'}, validations: {}};
        expect(this.instance._validators[input.props.name]).to.not.exist;
        this.instance.registerInput(input);
        expect(this.instance._validators[input.props.name]).to.exist;
      });

      it('should not care if the input does not have validations', () => {
        const input = {props: {name: 'myInput'}};
        expect(this.instance.registerInput.bind(this.instance, input)).to.not.throw();
        expect(this.instance._validators[input.props.name]).to.not.exist;
      });

      it('should not care if the input has invalid validations', () => {
        const input = {props: {name: 'myInput'}, validations: 'invalid'};
        expect(this.instance.registerInput.bind(this.instance, input)).to.not.throw();
        expect(this.instance._validators[input.props.name]).to.not.exist;
      });
    });

    describe('unregister input', () => {
      it('should remove the input validators', () => {
        const input = {props: {name: 'myInput'}, validations: {}};
        this.instance._validators[input.props.name] = input;
        expect(this.instance._validators[input.props.name]).to.exist;
        this.instance.unregisterInput(input);
        expect(this.instance._validators[input.props.name]).to.not.exist;
      });

      it('should not care if the input was not registered', () => {
        const input = {props: {name: 'myInput'}, validations: {}};
        expect(this.instance._validators[input.props.name]).to.not.exist;
        expect(this.instance.unregisterInput.bind(this.instance, input)).to.not.throw();
        expect(this.instance._validators[input.props.name]).to.not.exist;
      });
    });

    describe('get Values', () => {
      it('should return an object', () => {
        expect(this.instance.getValues()).to.be.an('object');
      });

      it('should get the values from the registered inputs',() => {
        const name = 'nameValue';
        const email = 'evan.sharp@availity.com';
        const dateOfBirth = new Date();
        const number = 4;
        const inputs = this.instance._inputs = {
          'name': {getValue: sinon.stub().returns(name)},
          'email': {getValue: sinon.stub().returns(email)},
          'dateOfBirth': {getValue: sinon.stub().returns(dateOfBirth)},
          'number': {getValue: sinon.stub().returns(number)},
        };
        this.instance.getValues();
        expect(inputs.name.getValue).to.have.been.calledOnce;
        expect(inputs.email.getValue).to.have.been.calledOnce;
        expect(inputs.dateOfBirth.getValue).to.have.been.calledOnce;
        expect(inputs.number.getValue).to.have.been.calledOnce;
      });

      it('should return the values for all of the registered fields',() => {
        const name = 'nameValue';
        const email = 'evan.sharp@availity.com';
        const dateOfBirth = new Date();
        const number = 4;
        this.instance._inputs = {
          'name': {getValue: () => name},
          'email': {getValue: () => email},
          'dateOfBirth': {getValue: () => dateOfBirth},
          'number': {getValue: () => number},
        };
        const result = this.instance.getValues();
        expect(result).to.deep.equal({name, email, dateOfBirth, number});
      });

      it('should return the values in a shape based on dot notation',() => {
        const first = 'first name';
        const last = 'last name';
        const email = 'evan.sharp@availity.com';
        const realDeep = 4;
        this.instance._inputs = {
          'name.first': {getValue: () => first},
          'name.last': {getValue: () => last},
          'email': {getValue: () => email},
          'going.real.deep.for.this.value': {getValue: () => realDeep},
        };
        const result = this.instance.getValues();
        expect(result).to.deep.equal({name:{first, last}, email, going:{real:{deep:{for:{this:{value:4}}}}}});
      });
    });

    describe('submit', () => {
      it('should call handleSubmit with the arguments passed', () => {
        const spy = sinon.spy(this.instance, 'handleSubmit');
        const args = {};
        this.instance.submit(args);
        expect(spy).to.have.been.calledWith(args);
      });
    });

    describe('reset', () => {
      it('should trigger reset on each of the registered inputs', () => {
        const inputs = this.instance._inputs = {
          'name.first': {reset: sinon.spy()},
          'name.last': {reset: sinon.spy()},
          'email': {reset: sinon.spy()},
          'going.real.deep.for.this.value': {reset: sinon.spy()},
        };
        this.instance.reset();
        expect(inputs['name.first'].reset).to.have.been.calledOnce;
        expect(inputs['name.last'].reset).to.have.been.calledOnce;
        expect(inputs.email.reset).to.have.been.calledOnce;
        expect(inputs['going.real.deep.for.this.value'].reset).to.have.been.calledOnce;
      });
    });

    describe('validate input', ()=> {
      it('should trigger validate one with the input and the values', () => {
        const values = {};
        const inputName = 'myInput';
        const validateOneSpy = sinon.stub(this.instance, 'validateOne');
        const getValuesSpy = sinon.stub(this.instance, 'getValues').returns(values);
        this.instance.validateInput(inputName);
        expect(getValuesSpy).to.have.been.calledBefore(validateOneSpy);
        expect(validateOneSpy).to.have.been.calledWith(inputName, values);
      });
    });

    describe('get input state', () => {
      describe('untouched field', () => {
        beforeEach(() => {
          this.isTouchedSpy = sinon.stub(this.instance, 'isTouched').returns(false);
        });
        it('should not return an error',() => {
          const inputName = 'myInput';
          const result = this.instance.getInputState(inputName);
          expect(this.isTouchedSpy).to.have.been.calledWith(inputName);
          expect(result).to.deep.equal({color: undefined, error: false, errorMessage: false});
        });

        it('should not check for an error',() => {
          const hasErrorSpy = sinon.spy(this.instance, 'hasError');
          const inputName = 'myInput';
          this.instance.getInputState(inputName);
          expect(this.isTouchedSpy).to.have.been.calledWith(inputName);
          expect(hasErrorSpy).to.not.have.been.called;
        });
      });

      describe('touched field', () => {
        beforeEach(() => {
          sinon.stub(this.instance, 'isTouched').returns(true);
        });

        it('should check if the field has an error',() => {
          const hasErrorSpy = sinon.stub(this.instance, 'hasError').returns(false);
          const inputName = 'myInput';
          this.instance.getInputState(inputName);
          expect(hasErrorSpy).to.have.been.calledWith(inputName);
        });

        it('should not return an error when the field is has not error',() => {
          sinon.stub(this.instance, 'hasError').returns(false);
          const inputName = 'myInput';
          const result = this.instance.getInputState(inputName);
          expect(result).to.deep.equal({color: undefined, error: false, errorMessage: false});
        });

        describe('with an error', () => {
          it('should return a color "danger"', () => {
            sinon.stub(this.instance, 'hasError').returns(true);
            const inputName = 'myInput';
            const result = this.instance.getInputState(inputName);
            expect(result.color).to.equal('danger');
          });

          it('should return a error true', () => {
            sinon.stub(this.instance, 'hasError').returns(true);
            const inputName = 'myInput';
            const result = this.instance.getInputState(inputName);
            expect(result.error).to.be.true;
          });

          it('should return an error message', () => {
            sinon.stub(this.instance, 'hasError').returns(true);
            const inputName = 'myInput';
            const result = this.instance.getInputState(inputName);
            expect(result.errorMessage).to.be.exist;
          });

          describe('the error message', () => {
            it('should be a string',() => {
              sinon.stub(this.instance, 'hasError').returns(true);
              const inputName = 'myInput';
              const result = this.instance.getInputState(inputName);
              expect(result.errorMessage).to.be.a('string');
            });

            it('should default to "This field is invalid"',() => {
              sinon.stub(this.instance, 'hasError').returns(true);
              const inputName = 'myInput';
              const result = this.instance.getInputState(inputName);
              expect(result.errorMessage).to.equal('This field is invalid');
            });

            it('should be the string returned from validation',() => {
              const message = 'my error message';
              sinon.stub(this.instance, 'hasError').returns(message);
              const inputName = 'myInput';
              const result = this.instance.getInputState(inputName);
              expect(result.errorMessage).to.equal(message);
            });
          });
        });
      });
    });

    describe('has error', () => {
      describe('with a name argument', () => {
        it('should be false if the input is not in the list',() => {
          const inputName = 'myInput';
          expect(this.instance.hasError(inputName)).to.be.false;
        });

        it('should be true when the input is invalid',() => {
          const inputName = 'myInput';
          this.instance.state.invalidInputs[inputName] = true;
          expect(this.instance.hasError(inputName)).to.be.true;
        });
      });

      describe('without a name argument', () => {
        it('should return false when none of the inputs are invalid',() => {
          expect(this.instance.hasError()).to.be.false;
        });

        it('should return true when any of the inputs are invalid',() => {
          this.instance.state.invalidInputs.name2 = true;
          expect(this.instance.hasError()).to.be.true;
        });
      });
    });

    describe('is dirty', () => {
      describe('with a name argument', () => {
        it('should be false if the input is not in the list',() => {
          const inputName = 'myInput';
          expect(this.instance.isDirty(inputName)).to.be.false;
        });

        it('should be true when the input is dirty',() => {
          const inputName = 'myInput';
          this.instance.state.dirtyInputs[inputName] = true;
          expect(this.instance.isDirty(inputName)).to.be.true;
        });
      });

      describe('without a name argument', () => {
        it('should return false when none of the inputs are dirty',() => {
          expect(this.instance.isDirty()).to.be.false;
        });

        it('should return true when any of the inputs are dirty',() => {
          this.instance.state.dirtyInputs.name2 = true;
          expect(this.instance.isDirty()).to.be.true;
        });
      });
    });

    describe('is touched', () => {
      describe('with a name argument', () => {
        it('should be false if the input is not in the list',() => {
          const inputName = 'myInput';
          expect(this.instance.isTouched(inputName)).to.be.false;
        });

        it('should be true when the input has been touched',() => {
          const inputName = 'myInput';
          this.instance.state.touchedInputs[inputName] = true;
          expect(this.instance.isTouched(inputName)).to.be.true;
        });
      });

      describe('without a name argument', () => {
        it('should return false when none of the inputs have been touched',() => {
          expect(this.instance.isTouched()).to.be.false;
        });

        it('should return true when any of the inputs have been touched',() => {
          this.instance.state.touchedInputs.name2 = true;
          expect(this.instance.isTouched()).to.be.true;
        });
      });
    });

    describe('is bad', () => {
      describe('with a name argument', () => {
        it('should be false if the input is not in the list',() => {
          const inputName = 'myInput';
          expect(this.instance.isBad(inputName)).to.be.false;
        });

        it('should be true when the input is bad',() => {
          const inputName = 'myInput';
          this.instance.state.badInputs[inputName] = true;
          expect(this.instance.isBad(inputName)).to.be.true;
        });
      });

      describe('without a name argument', () => {
        it('should return false when none of the inputs are bad',() => {
          expect(this.instance.isBad()).to.be.false;
        });

        it('should return true when any of the inputs are bad',() => {
          this.instance.state.badInputs.name2 = true;
          expect(this.instance.isBad()).to.be.true;
        });
      });
    });

    describe('set error', () => {
      it('should set error by default', () => {
        const inputName = 'myInput';
        const spy = sinon.spy(this.instance, 'setState');
        this.instance.setError(inputName);
        expect(spy).to.have.been.calledWithMatch({invalidInputs: {[inputName]: true}});
      });

      describe('when the error is new', () => {
        it('should set the error in state',() => {
          const inputName = 'myInput';
          const spy = sinon.spy(this.instance, 'setState');
          this.instance.setError(inputName, true);
          expect(spy).to.have.been.calledWithMatch({invalidInputs: {[inputName]: true}});
        });

        it('should set the error to true when no error text is provided',() => {
          const inputName = 'myInput';
          this.instance.setError(inputName, true);
          expect(this.instance.state.invalidInputs[inputName]).to.be.true;
        });

        it('should set the error to true when a falsey text is provided',() => {
          const inputName = 'myInput';
          this.instance.setError(inputName, true, '');
          expect(this.instance.state.invalidInputs[inputName]).to.be.true;
        });

        it('should set the error to the error text when error text is provided',() => {
          const inputName = 'myInput';
          const errorText = 'my error text';
          this.instance.setError(inputName, true, errorText);
          expect(this.instance.state.invalidInputs[inputName]).to.equal(errorText);
        });

        it('should set the error to the error text when error text is provided and not a string',() => {
          const inputName = 'myInput';
          const errorText = 'my error text';
          const myError = new Error(errorText);
          this.instance.setError(inputName, true, myError);
          expect(this.instance.state.invalidInputs[inputName]).to.contain(errorText);
        });
      });

      describe('when the error already exits', () => {
        it('should not set the error in state',() => {
          const inputName = 'myInput';
          sinon.stub(this.instance, 'hasError').returns(true);
          const spy = sinon.spy(this.instance, 'setState');
          this.instance.setError(inputName, true);
          expect(spy).to.not.have.been.called;
        });

        it('should update the state when the message has changed',() => {
          const inputName = 'myInput';
          sinon.stub(this.instance, 'hasError').returns(true);
          const spy = sinon.spy(this.instance, 'setState');
          const errorText = 'my error text';
          this.instance.setError(inputName, true, errorText);
          expect(spy).to.have.been.calledWithMatch({invalidInputs: {[inputName]: errorText}});
        });
      });

      describe('when the error is removed', () => {
        it('should update the state to remove the input from invalid inputs',() => {
          const inputName = 'myInput';
          sinon.stub(this.instance, 'hasError').returns(true);
          const spy = sinon.spy(this.instance, 'setState');
          this.instance.setError(inputName, false);
          expect(spy).to.have.been.calledWithMatch({invalidInputs: {}});
        });

        it('should not update the state when the input is not currently invalid',() => {
          const inputName = 'myInput';
          sinon.stub(this.instance, 'hasError').returns(false);
          const spy = sinon.spy(this.instance, 'setState');
          this.instance.setError(inputName, false);
          expect(spy).to.not.have.been.called;
        });
      });
    });

    describe('set dirty', () => {
      it('should set dirty by default', () => {
        const inputName = 'myInput';
        this.instance.setDirty(inputName);
        expect(this.instance.state.dirtyInputs[inputName]).to.be.true;
      });

      it('should set dirty when true is passed', () => {
        const inputName = 'myInput';
        this.instance.setDirty(inputName, true);
        expect(this.instance.state.dirtyInputs[inputName]).to.be.true;
      });

      it('should set dirty using setState', () => {
        const inputName = 'myInput';
        const spy = sinon.spy(this.instance, 'setState');
        this.instance.setDirty(inputName, true);
        expect(spy).to.have.been.calledWithMatch({dirtyInputs: {[inputName]: true}});
      });

      it('should accept an array of inputs to set dirty', () => {
        const inputNames = ['myInput', 'myOtherInput', 'myLastInput'];
        this.instance.setDirty(inputNames, true);
        expect(this.instance.state.dirtyInputs).to.contain.keys(inputNames);
      });

      it('should unset dirty when false is passed', () => {
        const inputName = 'myInput';
        this.instance.setDirty(inputName, false);
        expect(this.instance.state.dirtyInputs[inputName]).to.not.exist;
      });

      it('should unset dirty using setState', () => {
        const inputName = 'myInput';
        this.instance.state.dirtyInputs = {[inputName]: true, myOtherInput: true};
        const spy = sinon.spy(this.instance, 'setState');
        this.instance.setDirty(inputName, false);
        expect(spy).to.have.been.calledWithMatch({dirtyInputs: {myOtherInput: true}});
      });

      it('should accept an array of inputs to unset dirty', () => {
        const inputNames = ['myInput', 'myOtherInput', 'myLastInput'];
        this.instance.state.dirtyInputs = {keepThis: true, myOtherInput: true};
        this.instance.setDirty(inputNames, false);
        expect(this.instance.state.dirtyInputs).to.not.contain.any.keys(inputNames);
        expect(this.instance.state.dirtyInputs).to.contain.key('keepThis');
      });
    });

    describe('set touched', () => {
      it('should set touched by default', () => {
        const inputName = 'myInput';
        this.instance.setTouched(inputName);
        expect(this.instance.state.touchedInputs[inputName]).to.be.true;
      });

      it('should set touched when true is passed', () => {
        const inputName = 'myInput';
        this.instance.setTouched(inputName, true);
        expect(this.instance.state.touchedInputs[inputName]).to.be.true;
      });

      it('should set touched using setState', () => {
        const inputName = 'myInput';
        const spy = sinon.spy(this.instance, 'setState');
        this.instance.setTouched(inputName, true);
        expect(spy).to.have.been.calledWithMatch({touchedInputs: {[inputName]: true}});
      });

      it('should accept an array of inputs to set touched', () => {
        const inputNames = ['myInput', 'myOtherInput', 'myLastInput'];
        this.instance.setTouched(inputNames, true);
        expect(this.instance.state.touchedInputs).to.contain.keys(inputNames);
      });

      it('should unset touched when false is passed', () => {
        const inputName = 'myInput';
        this.instance.setTouched(inputName, false);
        expect(this.instance.state.touchedInputs[inputName]).to.not.exist;
      });

      it('should unset touched using setState', () => {
        const inputName = 'myInput';
        this.instance.state.touchedInputs = {[inputName]: true, myOtherInput: true};
        const spy = sinon.spy(this.instance, 'setState');
        this.instance.setTouched(inputName, false);
        expect(spy).to.have.been.calledWithMatch({touchedInputs: {myOtherInput: true}});
      });

      it('should accept an array of inputs to unset touched', () => {
        const inputNames = ['myInput', 'myOtherInput', 'myLastInput'];
        this.instance.state.touchedInputs = {keepThis: true, myOtherInput: true};
        this.instance.setTouched(inputNames, false);
        expect(this.instance.state.touchedInputs).to.not.contain.any.keys(inputNames);
        expect(this.instance.state.touchedInputs).to.contain.key('keepThis');
      });
    });

    describe('set bad', () => {
      it('should set bad by default', () => {
        const inputName = 'myInput';
        this.instance.setBad(inputName);
        expect(this.instance.state.badInputs[inputName]).to.be.true;
      });

      it('should set bad when true is passed', () => {
        const inputName = 'myInput';
        this.instance.setBad(inputName, true);
        expect(this.instance.state.badInputs[inputName]).to.be.true;
      });

      it('should set bad using setState', () => {
        const inputName = 'myInput';
        const spy = sinon.spy(this.instance, 'setState');
        this.instance.setBad(inputName, true);
        expect(spy).to.have.been.calledWithMatch({badInputs: {[inputName]: true}});
      });

      it('should accept an array of inputs to set bad', () => {
        const inputNames = ['myInput', 'myOtherInput', 'myLastInput'];
        this.instance.setBad(inputNames, true);
        expect(this.instance.state.badInputs).to.contain.keys(inputNames);
      });

      it('should unset bad when false is passed', () => {
        const inputName = 'myInput';
        this.instance.setBad(inputName, false);
        expect(this.instance.state.badInputs[inputName]).to.not.exist;
      });

      it('should unset bad using setState', () => {
        const inputName = 'myInput';
        this.instance.state.badInputs = {[inputName]: true, myOtherInput: true};
        const spy = sinon.spy(this.instance, 'setState');
        this.instance.setBad(inputName, false);
        expect(spy).to.have.been.calledWithMatch({badInputs: {myOtherInput: true}});
      });

      it('should accept an array of inputs to unset bad', () => {
        const inputNames = ['myInput', 'myOtherInput', 'myLastInput'];
        this.instance.state.badInputs = {keepThis: true, myOtherInput: true};
        this.instance.setBad(inputNames, false);
        expect(this.instance.state.badInputs).to.not.contain.any.keys(inputNames);
        expect(this.instance.state.badInputs).to.contain.key('keepThis');
      });
    });

    describe('validate one', () => {
      it('should return a boolean', () => {
        const inputName = 'myInput';
        this.instance._inputs = {[inputName]: {}};
        expect(this.instance.validateOne(inputName, {})).to.eventually.be.a('boolean');
      });

      it('should throw if more than one input has the same name', () => {
        const inputName = 'myInput';
        this.instance._inputs = {[inputName]: []};
        expect(this.instance.validateOne(inputName, {})).to.be.rejected;
      });

      describe('when validate is a function', () => {
        it('should call the function with value, context, and reference to the input', () => {
          const inputName = 'myInput';
          const spy = sinon.spy();
          const input = {validations: spy};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          this.instance._inputs = {[inputName]: input};
          this.instance.validateOne(inputName, context);
          expect(spy).to.have.been.calledWith(inputValue, context, input);
        });

        it('should set error when the function returns false', () => {
          const inputName = 'myInput';
          const input = {validations: () => false};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          const spy = sinon.stub(this.instance, 'setError');
          this.instance._inputs = {[inputName]: input};
          return this.instance.validateOne(inputName, context).then(result => {
            expect(spy).to.have.been.calledWith(inputName, true, undefined);
            expect(result).to.be.false;
          });
        });

        it('should set error when the function returns a string', () => {
          const inputName = 'myInput';
          const errorMessage = 'myerror message';
          const input = {validations: () => errorMessage};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          const spy = sinon.stub(this.instance, 'setError');
          this.instance._inputs = {[inputName]: input};
          return this.instance.validateOne(inputName, context).then(result => {
            expect(spy).to.have.been.calledWith(inputName, true, errorMessage);
            expect(result).to.be.false;
          });
        });

        it('should remove error when the function returns true', () => {
          const inputName = 'myInput';
          const input = {validations: () => true};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          const spy = sinon.stub(this.instance, 'setError');
          this.instance._inputs = {[inputName]: input};
          return this.instance.validateOne(inputName, context).then(result => {
            expect(spy).to.have.been.calledWith(inputName, false, undefined);
            expect(result).to.be.true;
          });
        });
      });

      describe('when validate is an object', () => {
        it('should call the validators with value and context', () => {
          const inputName = 'myInput';
          const validatorsSpy = this.instance._validators[inputName] = sinon.stub();
          const input = {validations: {}};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          this.instance._inputs = {[inputName]: input};
          return this.instance.validateOne(inputName, context).then(() => {
            expect(validatorsSpy).to.have.been.calledWith(inputValue, context);
          });
        });

        it('should set error when the validators returns false', () => {
          const inputName = 'myInput';
          this.instance._validators[inputName] = sinon.stub().returns(false);
          const input = {validations: {}};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          const spy = sinon.stub(this.instance, 'setError');
          this.instance._inputs = {[inputName]: input};
          return this.instance.validateOne(inputName, context).then(result => {
            expect(spy).to.have.been.calledWith(inputName, true, undefined);
            expect(result).to.be.false;
          });
        });

        it('should set error when the validators returns a string', () => {
          const inputName = 'myInput';
          const errorMessage = 'myerror message';
          this.instance._validators[inputName] = sinon.stub().returns(errorMessage);
          const input = {validations: {}};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          const spy = sinon.stub(this.instance, 'setError');
          this.instance._inputs = {[inputName]: input};
          return this.instance.validateOne(inputName, context).then(result => {
            expect(spy).to.have.been.calledWith(inputName, true, errorMessage);
            expect(result).to.be.false;
          });
        });

        it('should remove error when the validators returns true', () => {
          const inputName = 'myInput';
          this.instance._validators[inputName] = sinon.stub().returns(true);
          const input = {validations: {}};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          const spy = sinon.stub(this.instance, 'setError');
          this.instance._inputs = {[inputName]: input};
          return this.instance.validateOne(inputName, context).then(result => {
            expect(spy).to.have.been.calledWith(inputName, false, undefined);
            expect(result).to.be.true;
          });
        });
      });

      describe('when validate is something else', () => {
        it('should return true', () => {
          const inputName = 'myInput';
          const input = {};
          const inputValue = 'some value';
          const context = {[inputName]: inputValue};
          this.instance._inputs = {[inputName]: input};
          return expect(this.instance.validateOne(inputName, context)).to.eventually.be.true;
        });
      });
    });

    describe('validate all', () => {
      it('should return an object', () => {
        return expect(this.instance.validateAll({})).to.eventually.be.an('object');
      });

      it('should validate each registered input', () => {
        this.instance._inputs = {input1: {}, input2: {}, input3: {}};
        const context = {input1: 'input1value', input2: 'input2value', input3: 'input3value'};
        const spy = sinon.stub(this.instance, 'validateOne');
        return this.instance.validateAll(context).then(() => {
          expect(spy).to.have.been.calledThrice;
          expect(spy.firstCall).to.have.been.calledWith('input1', context);
          expect(spy.secondCall).to.have.been.calledWith('input2', context);
          expect(spy.thirdCall).to.have.been.calledWith('input3', context);
        });
      });

      it('should indicate when a input has an error', () => {
        this.instance._inputs = {input1: {}, input2: {}, input3: {}};
        const context = {input1: 'input1value', input2: 'input2value', input3: 'input3value'};
         sinon.stub(this.instance, 'validateOne').returns(false);
        return expect(this.instance.validateAll(context)).to.eventually.have.property('isValid', false);
      });

      it('should indicate which inputs have an error when a input has an error', () => {
        this.instance._inputs = {input1: {}, input2: {}, input3: {}};
        const context = {input1: 'input1value', input2: 'input2value', input3: 'input3value'};
        const stub = sinon.stub(this.instance, 'validateOne');
        stub.withArgs('input2', context).returns(false);
        stub.returns(true);
        return this.instance.validateAll(context).then(result => {
          expect(result.errors).to.contain('input2');
          expect(result.errors).to.not.contain.any('input1', 'input3');
        });
      });

      describe('form level validation', () => {
        it('should call the form validate prop if it exists', () => {
          const spy = sinon.spy();
          this.wrapper.setProps({validate: spy});
          const context = {};
          this.instance.validateAll(context);
          expect(spy).to.have.been.calledWith(context);
        });

        it('should call the functions in the form validate prop if it exists and is an array until one returns an error', () => {
          const spy1 = sinon.stub().returns(true);
          const spy2 = sinon.stub().returns(false);
          const spy3 = sinon.stub().returns(true);
          this.wrapper.setProps({validate: [spy1, spy2, spy3]});
          const context = {};
          this.instance.validateAll(context);
          expect(spy1).to.have.been.calledWith(context);
          expect(spy2).to.have.been.calledWith(context);
          expect(spy3).to.not.have.been.called;
        });

        it('should indicate a form level validation error when form is invalid',() => {
          const spy1 = sinon.stub().returns(true);
          const spy2 = sinon.stub().returns(false);
          this.wrapper.setProps({validate: [spy1, spy2]});
          const context = {};
          return expect(this.instance.validateAll(context)).to.eventually.deep.equal({isValid: false, errors:['*']});
        });

        it('should not indicate a form level validation error when form is valid',() => {
          const spy1 = sinon.stub().returns(true);
          const spy2 = sinon.stub().returns(true);
          this.wrapper.setProps({validate: [spy1, spy2]});
          const context = {};
          return expect(this.instance.validateAll(context)).to.eventually.deep.equal({isValid: true, errors:[]});
        });
      });
    });

    describe('compile validation rules', () => {
      it('should return a function', () => {
        expect(this.instance.compileValidationRules()).to.be.a('function');
      });

      describe('the validation function',() => {
        it('should throw when the specific validation does not exist', () => {
          const input = {props: {name: 'myInput'}};
          const rules = {myRuleDoesNotExist: true};
          const fn = this.instance.compileValidationRules(input, rules);
          return expect(fn()).to.eventually.rejectedWith('Invalid input validation rule: "myRuleDoesNotExist"');
        });

        it('should return false if the input is bad', () => {
          sinon.stub(this.instance, 'isBad').returns(true);
          const input = {props: {name: 'myInput'}};
          const fn = this.instance.compileValidationRules(input, {});
          return expect(fn()).to.eventually.be.false;
        });

        it('should not perform validations if the input is bad', () => {
          sinon.stub(this.instance, 'isBad').returns(true);
          const input = {props: {name: 'myInput'}};
          const spy = sinon.spy();
          const rules = {myFn: (...args) => spy(...args) || true};
          const fn = this.instance.compileValidationRules(input, rules);

          return expect(fn()).to.eventually.be.false.then(() => {
            expect(spy).to.not.have.been.called;
          });
        });

        it('should be able to handle a returned promise', () => {
          let resolve;
          const input = {props: {name: 'myInput'}};
          const rules = {myFn: () => {
            return new Promise(r => {
              resolve = r;
            });
          }};
          const fn = this.instance.compileValidationRules(input, rules);
          const result = fn();
          expect(result).to.not.be.fulfilled;
          resolve(true);
          return expect(result).to.be.fulfilled.and.eventually.be.true;
        });

        describe('returned promised', () => {
          it('should be able to return true to invalid valid', () => {
            let resolve;
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => {
              return new Promise(r => {
                resolve = r;
              });
            }};
            const fn = this.instance.compileValidationRules(input, rules);
            const result = fn();
            expect(result).to.not.be.fulfilled;
            resolve(true);
            return expect(result).to.be.fulfilled.and.eventually.be.true;
          });

          it('should be able to return false to indicate invalud', () => {
            let resolve;
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => {
              return new Promise(r => {
                resolve = r;
              });
            }};
            const fn = this.instance.compileValidationRules(input, rules);
            const result = fn();
            expect(result).to.not.be.fulfilled;
            resolve(false);
            return expect(result).to.be.fulfilled.and.eventually.be.false;
          });

          it('should be able to return a string error message', () => {
            let resolve;
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => {
              return new Promise(r => {
                resolve = r;
              });
            }};
            const errorMessage = 'my error message';
            const fn = this.instance.compileValidationRules(input, rules);
            const result = fn();
            expect(result).to.not.be.fulfilled;
            resolve(errorMessage);
            return expect(result).to.be.fulfilled.and.eventually.be.equal(errorMessage);
          });
        });


        it('should be able to use a callback', () => {
          let callback;
          const input = {props: {name: 'myInput'}};
          const rules = {myFn: (value, ctx, input, cb) => {
            callback = cb;
          }};
          const fn = this.instance.compileValidationRules(input, rules);
          const result = fn();
          expect(result).to.not.be.fulfilled;
          callback(true);
          return expect(result).to.be.fulfilled.and.eventually.be.true;
        });

        describe('using the callback', () => {
          it('should be able to return true to invalid valid', () => {
            let callback;
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: (value, ctx, input, cb) => {
              callback = cb;
            }};
            const fn = this.instance.compileValidationRules(input, rules);
            const result = fn();
            expect(result).to.not.be.fulfilled;
            callback(true);
            return expect(result).to.be.fulfilled.and.eventually.be.true;
          });

          it('should be able to return false to indicate invalud', () => {
            let callback;
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: (value, ctx, input, cb) => {
              callback = cb;
            }};
            const fn = this.instance.compileValidationRules(input, rules);
            const result = fn();
            expect(result).to.not.be.fulfilled;
            callback(false);
            return expect(result).to.be.fulfilled.and.eventually.be.false;
          });

          it('should be able to return a string error message', () => {
            let callback;
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: (value, ctx, input, cb) => {
              callback = cb;
            }};
            const errorMessage = 'my error message';
            const fn = this.instance.compileValidationRules(input, rules);
            const result = fn();
            expect(result).to.not.be.fulfilled;
            callback(errorMessage);
            return expect(result).to.be.fulfilled.and.eventually.be.equal(errorMessage);
          });
        });

        describe('when validate prop object has a function', ()=> {
          it('should call the validation function', () => {
            const input = {props: {name: 'myInput'}};
            const spy = sinon.spy();
            const rules = {myFn: (...args) => spy(...args) || true};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};
            return fn(value, context).then(() => {
              expect(spy).to.have.been.calledWith(value, context, input);
            });
          });

          it('should return false when the function returns false and no message is not supplied', () => {
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => false};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.be.false;
          });

          it('should return a string when the function returns false and message is provided on the input', () => {
            const errorMessage = 'my error message';
            const input = {props: {name: 'myInput', errorMessage}};
            const rules = {myFn: () => false};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage);
          });

          it('should return a string when the function returns false and message is mapped on the input', () => {
            const errorMessage = {myFn: 'my error message'};
            const input = {props: {name: 'myInput', errorMessage}};
            const rules = {myFn: () => false};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage.myFn);
          });

          it('should return a string when the function returns false and message is provided on the form', () => {
            const errorMessage = 'my error message';
            this.wrapper.setProps({errorMessage});
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => false};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage);
          });

          it('should return a string when the function returns false and message is mapped on the form', () => {
            const errorMessage = {myFn: 'my error message'};
            this.wrapper.setProps({errorMessage});
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => false};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage.myFn);
          });

          it('should return a string when the function returns a string', () => {
            const input = {props: {name: 'myInput'}};
            const errorMessage = 'my error message';
            const rules = {myFn: () => errorMessage};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage);
          });
        });

        describe('when validate prop object has a validation key', ()=> {
          before(() => {
            this.minStub = sinon.stub(AvValidator, 'min').returns(false);
            this.maxStub = sinon.stub(AvValidator, 'max').returns(true);
            this.emailStub = sinon.stub(AvValidator, 'email').returns('Invalid Email');
          });

          after(() => {
            this.minStub.restore();
            this.maxStub.restore();
            this.emailStub.restore();
          });

          it('should call the validation function based on the key', () => {
            const input = {props: {name: 'myInput'}};
            const rules = {min: {value: 6}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};
            return fn(value, context).then(() => {
              expect(this.minStub).to.have.been.calledWith(value, context, rules.min, input);
            });
          });

          it('should return false when the function returns false and no message is not supplied', () => {
            const input = {props: {name: 'myInput'}};
            const rules = {min: {value: 6}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.be.false;
          });

          it('should return a string when the function returns false and message is provided on the input', () => {
            const errorMessage = 'my error message';
            const input = {props: {name: 'myInput', errorMessage}};
            const rules = {min: {value: 6}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage);
          });

          it('should return a string when the function returns false and message is mapped on the input', () => {
            const errorMessage = {min: 'my error message'};
            const input = {props: {name: 'myInput', errorMessage}};
            const rules = {min: {value: 6}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage.min);
          });

          it('should return a string when the function returns false and message is provided on the form', () => {
            const errorMessage = 'my error message';
            this.wrapper.setProps({errorMessage});
            const input = {props: {name: 'myInput'}};
            const rules = {min: {value: 6}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage);
          });

          it('should return a string when the function returns false and message is mapped on the form', () => {
            const errorMessage = {min: 'my error message'};
            this.wrapper.setProps({errorMessage});
            const input = {props: {name: 'myInput'}};
            const rules = {min: {value: 6}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal(errorMessage.min);
          });

          it('should return a string when the function returns a string', () => {
            const input = {props: {name: 'myInput'}};
            const rules = {email: {value: true}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.equal('Invalid Email');
          });
        });

        describe('multiple validations', () => {
          before(() => {
            this.minStub = sinon.stub(AvValidator, 'min').returns(false);
            this.maxStub = sinon.stub(AvValidator, 'max').returns(true);
          });

          after(() => {
            this.minStub.restore();
            this.maxStub.restore();
          });

          it('should return true if all of the validations pass', () => {
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => true, max: {value:12}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.be.true;
          });

          it('should return false is any of the validations fail', () => {
            const input = {props: {name: 'myInput'}};
            const rules = {myFn: () => false, max: {value:12}, min: {value: 6}};
            const fn = this.instance.compileValidationRules(input, rules);
            const value = 'myvalue';
            const context = {};

            return expect(fn(value, context)).to.eventually.be.false;
          });
        });
      });
    });

    describe('get default value',() => {
      it('should get the input out of the model from props', () => {
        const model = {something: {deep: {like: 'this'}}};
        this.wrapper.setProps({model});
        expect(this.instance.getDefaultValue('something.deep.like')).to.equal('this');
      });
    });

    describe('get value', () => {
      it('should throw if more than one input has the same name', () => {
        const inputName = 'myInput';
        this.instance._inputs = {[inputName]: []};
        expect(this.instance.getValue.bind(this.instance, inputName)).to.throw();
      });

      it('should call getValue from the specific input', () => {
        const inputName = 'myInput';
        const spy = sinon.spy();
        this.instance._inputs = {[inputName]: {getValue: spy}};
        this.instance.getValue(inputName);
        expect(spy).to.have.been.calledOnce;
      });
    });
  });
});
