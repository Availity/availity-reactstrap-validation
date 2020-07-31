import React from 'react';
import { AvCheckbox } from 'availity-reactstrap-validation';
import { Input } from 'reactstrap';

let options;
let props;
let inputState;
let component;

describe('AvCheckbox', () => {
  let touched;
  let dirty;
  let bad;
  let error;

  beforeEach(() => {
    touched = false;
    dirty = false;
    bad = false;
    error = false;
    options = {
      context: {
        Group: {
          getProps: () => ({
            name: 'test',
          }),
        },
        FormCtrl: {
          inputs: {},
          getDefaultValue: () => {},
          getInputState: () => ({}),
          hasError: () => error,
          isDirty: () => dirty,
          isTouched: () => touched,
          isBad: () => bad,
          isDisabled: () => false,
          isReadOnly: () => false,
          setDirty: () => {},
          setTouched: () => {},
          setBad: () => {},
          register: () => {},
          unregister: () => {},
          validate: () => {},
          getValidationEvent: () => {},
          validation: {},
          parent: null,
        },
      },
    };
  });

  it('should render a reactstrap Input', () => {
    const wrapper = shallow(<AvCheckbox name="yo" />, options);

    expect(wrapper.type()).to.not.be.undefined;
  });

  it('should have "is-untouched" class when untouched', () => {
    const wrapper = shallow(<AvCheckbox name="yo" />, options);

    expect(wrapper.find(Input).hasClass('is-untouched')).to.be.true;
    expect(wrapper.find(Input).hasClass('is-touched')).to.be.false;
  });

  it('should have "is-pristine" class when not dirty', () => {
    const wrapper = shallow(<AvCheckbox name="yo" />, options);

    expect(wrapper.find(Input).hasClass('is-pristine')).to.be.true;
    expect(wrapper.find(Input).hasClass('is-dirty')).to.be.false;
  });

  it('should have "av-valid" not "is-invalid" class when valid', () => {
    const wrapper = shallow(<AvCheckbox name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-valid')).to.be.true;
    expect(wrapper.find(Input).hasClass('is-invalid')).to.be.false;
  });

  it('should have "is-touched" class when touched', () => {
    touched = true;
    const wrapper = shallow(<AvCheckbox name="yo" />, options);

    expect(wrapper.find(Input).hasClass('is-untouched')).to.be.false;
    expect(wrapper.find(Input).hasClass('is-touched')).to.be.true;
  });

  it('should have "is-pristine" class when not dirty', () => {
    dirty = true;
    const wrapper = shallow(<AvCheckbox name="yo" />, options);

    expect(wrapper.find(Input).hasClass('is-pristine')).to.be.false;
    expect(wrapper.find(Input).hasClass('is-dirty')).to.be.true;
  });

  it('should have "is-invalid" not "av-valid" class when invalid and touched', () => {
    error = true;
    touched = true;
    const wrapper = shallow(<AvCheckbox name="yo" />, options);

    expect(wrapper.find(Input).hasClass('av-valid')).to.be.false;
    expect(wrapper.find(Input).hasClass('is-invalid')).to.be.true;
  });

  it('should toString the value to add it to the DOM via Input', () => {
    const wrapper = shallow(<AvCheckbox name="yo" value="yes" />, options);
    expect(wrapper.find(Input).prop('value')).to.eql('yes');
  });

  describe('on change handler', () => {
    beforeEach(() => {
      touched = false;
      dirty = false;
      bad = false;
      error = false;
      inputState = 'danger';
      props = {
        name: 'fieldName',
        value: 'testValue',
      };
      options = {
        context: {
          Group: {
            getProps: () => ({
              name: 'test',
            }),
            update: sinon.spy(),
          },
          FormCtrl: {
            inputs: {},
            getDefaultValue: sinon.spy(),
            getInputState: sinon.stub().returns(inputState),
            hasError: () => error,
            isDirty: () => dirty,
            isTouched: () => touched,
            isBad: () => bad,
            setDirty: sinon.spy(),
            setTouched: sinon.spy(),
            setBad: sinon.spy(),
            register: sinon.spy(),
            unregister: sinon.spy(),
            validate: sinon.spy(),
            getValidationEvent: () => 'formCtrlValidationEvent',
            validation: {},
            parent: null,
          },
        },
      };

      component = new AvCheckbox(props);
      component.context = options.context;
    });

    it('should update group value on change', () => {
      const event = {};
      component.onChangeHandler(event);
      expect(options.context.Group.update).to.have.been.calledWith(event, props.value);
    });

    it('should run props on change if it\'s there', () => {
      props.onChange = sinon.spy();
      component.onChangeHandler();
      expect(props.onChange).to.have.been.called;
    });
  });

});
