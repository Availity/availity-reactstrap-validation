import React from 'react';
import { shallow } from 'enzyme';
import { AvRadioGroup, AvFeedback } from 'availity-reactstrap-validation';
import { FormGroup } from 'reactstrap';

let options;

describe('AvRadioGroup', () => {
  beforeEach(() => {
    options = {
      context: {
        FormCtrl: {
          inputs: {},
          getDefaultValue: ()=> {},
          getInputState: ()=> {return {}},
          hasError: {},
          isDirty: {},
          isTouched: {},
          setDirty: sinon.spy(),
          setTouched: sinon.spy(),
          setBad: sinon.spy(),
          register: sinon.spy(),
          unregister: sinon.spy(),
          validate: sinon.spy(),
          validationEvent: ()=> {},
          validation: {},
          parent: null,
        },
      },
    };
  });

  it('should render a reactstrap Input', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);

    expect(wrapper.type()).to.not.eql(undefined);
  });

  it('should register a validation', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" required />, options);
    const instance = wrapper.instance();
    expect(instance.validations.required.value).to.be.true;
  });

  it('should register then remove a disabled validation', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" required />, options);
    const instance = wrapper.instance();
    expect(instance.validations.required.value).to.be.true;
    wrapper.setProps({required: false});
    expect(instance.validations.required).to.be.undefined;
  });

  it('should return the set value', ()=> {
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    const component = wrapper.instance();
    component.value = 'boop';
    expect(component.getValue()).to.equal('boop');
  });

  it('should unregister when unmounted', ()=> {
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    wrapper.unmount();
    expect(options.context.FormCtrl.unregister).to.have.been.called;
  });

  it('should give default value from props', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" defaultValue="momo" />, options);
    const component = wrapper.instance();
    expect(component.getDefaultValue()).to.eql({key: 'defaultValue', value: 'momo'});
  });

  it('should update the value when the value prop changes', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" defaultValue="momo" />, options);
    const component = wrapper.instance();
    expect(component.getValue()).to.equal('momo');
    wrapper.setProps({value: 'yoyo'});
    expect(component.getValue()).to.equal('yoyo');
  });

  it('should give default value from context', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    const component = wrapper.instance();
    component.context.FormCtrl.getDefaultValue = () => {
      return 'jiri';
    };
    expect(component.getDefaultValue()).to.eql({key: 'defaultValue', value: 'jiri'});
  });

  it('should give default fallback when no one set up their stuff', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    const component = wrapper.instance();
    expect(component.getDefaultValue()).to.eql({key: 'defaultValue', value: ''});
  });

  it('should reset properly', () => {
    const wrapper = shallow(<AvRadioGroup name="test" defaultValue="momo" />, options);
    const component = wrapper.instance();
    component.setState = sinon.spy();
    component.reset();
    expect(component.value).to.equal('momo');
    expect(component.setState).to.have.been.calledWith({value: 'momo'});
    expect(options.context.FormCtrl.setDirty).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.setTouched).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.setBad).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.validate).to.have.been.calledWith('test');
  });

  it('should reset properly and call props reset', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<AvRadioGroup defaultValue="momo" name="test" onReset={spy} />, options);
    const component = wrapper.instance();
    component.reset();
    expect(spy).to.have.been.calledWith('momo');
  });

  it('should disconnect child context from form registration and validation', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    const component = wrapper.instance();
    options.context.FormCtrl.register.reset();
    options.context.FormCtrl.validate.reset();
    component.getChildContext().FormCtrl.register('charmander');
    component.getChildContext().FormCtrl.validate('squirtle');
    expect(options.context.FormCtrl.register).to.not.have.been.called;
    expect(options.context.FormCtrl.validate).to.not.have.been.called;
  });

  it('should update the group via child context', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    const component = wrapper.instance();
    component.setState = sinon.spy();
    component.getChildContext().Group.update('momo');
    expect(component.value).to.equal('momo');
    expect(component.setState).to.have.been.calledWith({value: 'momo'});
    expect(options.context.FormCtrl.validate).to.have.been.called;
  });

  it('should render validation message when sent', () => {
    options.context.FormCtrl.getInputState = () => {
      return {'errorMessage': 'WHAT ARE YOU DOING?!'};
    };
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    expect(wrapper.find(AvFeedback).prop('children')).to.equal('WHAT ARE YOU DOING?!');
  });

  it('should not render validation message when false', () => {
    options.context.FormCtrl.getInputState = () => {
      return {'errorMessage': false};
    };
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    expect(wrapper.find(AvFeedback)).to.have.lengthOf(0);
  });

  it('should show a legend if we defined a label', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" label="test" />, options);
    expect(wrapper.contains(<legend>test</legend>)).to.be.true;
  });

  it('should wrap the children in a FormGroup when inline', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" label="test" inline />, options);
    expect(wrapper.childAt(1).type()).to.equal(FormGroup);
  });

});
