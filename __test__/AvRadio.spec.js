import React from 'react';
import { shallow } from 'enzyme';
import { AvRadio } from 'availity-reactstrap-validation';
import { Input } from 'reactstrap';

let options, props, inputState, component, setStateSpy;

describe('AvRadio', () => {
  beforeEach(() => {
    options = {
      context: {
        Group: {
          name: 'test'
        },
        FormCtrl: {
          inputs: {},
          getDefaultValue: ()=> {},
          getInputState: ()=> {return {}},
          hasError: {},
          isDirty: {},
          isTouched: {},
          setDirty: ()=> {},
          setTouched: ()=> {},
          setBad: ()=> {},
          register: ()=> {},
          unregister: ()=> {},
          validate: ()=> {},
          validationEvent: ()=> {},
          validation: {},
          parent: null,
        },
      },
    };
  });

  it('should render a reactstrap Input', () => {
    const wrapper = shallow(<AvRadio name="yo" />, options);

    expect(wrapper.type()).to.not.eql(undefined);
  });

  it('should have "av-untouched" class when untouched', () => {
    const wrapper = shallow(<AvRadio name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-untouched')).to.be.true;
    expect(wrapper.find(Input).hasClass('av-touched')).to.be.false;
  });

  it('should have "av-pristine" class when not dirty', () => {
    const wrapper = shallow(<AvRadio name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-pristine')).to.be.true;
    expect(wrapper.find(Input).hasClass('av-dirty')).to.be.false;
  });

  it('should have "av-valid" class when not invalid', () => {
    const wrapper = shallow(<AvRadio name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-valid')).to.be.true;
    expect(wrapper.find(Input).hasClass('av-invalid')).to.be.false;
  });

  it('should have "av-touched" class when touched', () => {
    options.context.FormCtrl.isTouched.yo = true;
    const wrapper = shallow(<AvRadio name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-untouched')).to.be.false;
    expect(wrapper.find(Input).hasClass('av-touched')).to.be.true;
  });

  it('should have "av-pristine" class when not dirty', () => {
    options.context.FormCtrl.isDirty.yo = true;
    const wrapper = shallow(<AvRadio name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-pristine')).to.be.false;
    expect(wrapper.find(Input).hasClass('av-dirty')).to.be.true;
  });

  it('should have "av-valid" class when not invalid', () => {
    options.context.FormCtrl.hasError.yo = true;
    const wrapper = shallow(<AvRadio name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-valid')).to.be.false;
    expect(wrapper.find(Input).hasClass('av-invalid')).to.be.true;
  });

  describe('on change handler', () => {
    beforeEach(() => {
      inputState = 'danger';
      props = {
        name: 'fieldName',
        validateEvent: '',
        validate: {},
        value: 'testValue'
      };
      options = {
        context: {
          Group: {
            name: 'test',
            update: sinon.spy()
          },
          FormCtrl: {
            inputs: {},
            getDefaultValue: sinon.spy(),
            getInputState: sinon.stub().returns(inputState),
            hasError: {},
            isDirty: {},
            isTouched: {},
            setDirty: sinon.spy(),
            setTouched: sinon.spy(),
            setBad: sinon.spy(),
            register: sinon.spy(),
            unregister: sinon.spy(),
            validate: sinon.spy(),
            validationEvent: 'formCtrlValidationEvent',
            validation: {},
            parent: null,
            },
        },
      };

      component = new AvRadio(props);
      component.context = options.context;
      setStateSpy = component.setState = sinon.spy();
    });

    it('should update group value on change', () => {
      component.onChangeHandler();
      expect(options.context.Group.update).to.have.been.calledWith(props.value);
    });

    it('should run props on change if it\'s there', () => {
      props.onChange = sinon.spy();
      component.onChangeHandler();
      expect(props.onChange).to.have.been.called;
    });
  });

});
