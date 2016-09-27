import React from 'react';
import { shallow } from 'enzyme';
import { AvRadioGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Input } from 'reactstrap';

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
    let component = new AvRadioGroup({validate: ()=> {}});
    component.props.required = true;
    component.context = options.context;
    component.componentWillMount();
    expect(component.validations.required).to.eql({value: true});
    component.props.required = false;
    component.componentWillMount();
    expect(component.validations.required).to.eql(undefined);
  });

  it('should register then remove a disabled validation', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.props.required = true;
    component.context = options.context;
    component.componentWillMount();
    component.props.required = false;
    component.componentWillMount();
    expect(component.validations.required).to.eql(undefined);
  });

  it('should return the set value', ()=> {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.selection = 'boop';
    expect(component.getValue()).to.equal('boop');
  })

  it('should unregister when unmounted', ()=> {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.context = options.context;
    component.componentWillUnmount();
    expect(options.context.FormCtrl.unregister).to.have.been.called;
  });

  it('should give default value from props', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.props.defaultValue = 'momo';
    expect(component.getDefaultValue()).to.eql({key: 'defaultValue', value: 'momo'});
  });

  it('should give default value from context', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.context = options.context;
    component.context.FormCtrl.getDefaultValue = () => {
      return 'jiri';
    }
    expect(component.getDefaultValue()).to.eql({key: 'defaultValue', value: 'jiri'});
  });

  it('should give default fallback when no one set up their stuff', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.context = options.context;
    expect(component.getDefaultValue()).to.eql({key: 'defaultValue', value: ''});
  });

  it('should reset properly', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.context = options.context;
    component.setState = sinon.spy();
    component.props.defaultValue = 'momo';
    component.props.name = 'test';
    component.reset();
    expect(component.selection).to.equal('momo');
    expect(component.setState).to.have.been.calledWith({selection: 'momo'});
    expect(options.context.FormCtrl.setDirty).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.setTouched).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.setBad).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.validate).to.have.been.calledWith('test');
  });

  it('should reset properly and call props reset', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.context = options.context;
    component.props.defaultValue = 'momo';
    component.props.name = 'test';
    component.setState = sinon.spy();
    component.props.onReset = sinon.spy();
    component.reset();
    expect(component.selection).to.equal('momo');
    expect(component.setState).to.have.been.calledWith({selection: 'momo'});
    expect(options.context.FormCtrl.setDirty).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.setTouched).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.setBad).to.have.been.calledWith('test', false);
    expect(options.context.FormCtrl.validate).to.have.been.calledWith('test');
    expect(component.props.onReset).to.have.been.calledWith('momo');
  });

  it('should disconnect child context from form registration and validation', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.context = options.context;
    component.getChildContext().FormCtrl.register('charmander');
    component.getChildContext().FormCtrl.validate('squirtle');
    expect(options.context.FormCtrl.register).to.not.have.been.called;
    expect(options.context.FormCtrl.validate).to.not.have.been.called;
  });

  it('should update the group via child context', () => {
    let component = new AvRadioGroup({validate: ()=> {}});
    component.context = options.context;
    component.setState = sinon.spy();
    component.getChildContext().Group.update('momo');
    expect(component.selection).to.equal('momo');
    expect(component.setState).to.have.been.calledWith({selection: 'momo'});
    expect(options.context.FormCtrl.validate).to.have.been.called;
  });

  it('should render validation message when sent', () => {
    options.context.FormCtrl.getInputState = () => {
      return {'errorMessage': 'WHAT ARE YOU DOING?!'};
    }
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    expect(wrapper.find(AvFeedback).prop('children')).to.equal('WHAT ARE YOU DOING?!');
  });

  it('should not render validation message when false', () => {
    options.context.FormCtrl.getInputState = () => {
      return {'errorMessage': false};
    }
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);
    expect(wrapper.find(AvFeedback)).to.have.length(0);
  });

  it('should show a legend if we defined a label', () => {
    const wrapper = shallow(<AvRadioGroup name="yo" label="test" />, options);
     expect(wrapper.contains(<legend>test</legend>)).to.equal(true)
  });

});
