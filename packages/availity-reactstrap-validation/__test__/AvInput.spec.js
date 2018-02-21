import React from 'react';
import { shallow } from 'enzyme';
import { AvInput } from 'availity-reactstrap-validation';
import { Input } from 'reactstrap';

let options;

describe('AvInput', () => {
  beforeEach(() => {
    options = {
      context: {
        FormCtrl: {
          inputs: {},
          getDefaultValue: ()=> {},
          getInputState: ()=> {},
          hasError: {},
          isDirty: {},
          isTouched: {},
          isBad: {},
          setDirty: ()=> {},
          setTouched: ()=> {},
          setBad: ()=> {},
          register: ()=> {},
          unregister: ()=> {},
          validate: ()=> {},
          validationEvent: ()=> {},
          parent: null,
        },
      },
    };
  });

  it('should render a reactstrap Input', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.type()).to.equal(Input);
  });

  it('should have "av-untouched" class when untouched', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-untouched')).to.be.true;
    expect(wrapper.hasClass('av-touched')).to.be.false;
  });

  it('should have "av-pristine" class when not dirty', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-pristine')).to.be.true;
    expect(wrapper.hasClass('av-dirty')).to.be.false;
  });

  it('should have "av-valid" class when not invalid', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-valid')).to.be.true;
    expect(wrapper.hasClass('av-invalid')).to.be.false;
  });

  it('should not have "av-bad-input" class when the input is not "bad"', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-bad-input')).to.be.false;
  });

  it('should have "av-touched" class when touched', () => {
    options.context.FormCtrl.isTouched.yo = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-untouched')).to.be.false;
    expect(wrapper.hasClass('av-touched')).to.be.true;
  });

  it('should have "av-pristine" class when not dirty', () => {
    options.context.FormCtrl.isDirty.yo = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-pristine')).to.be.false;
    expect(wrapper.hasClass('av-dirty')).to.be.true;
  });

  it('should have "av-valid" class when not invalid', () => {
    options.context.FormCtrl.hasError.yo = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-valid')).to.be.false;
    expect(wrapper.hasClass('av-invalid')).to.be.true;
  });

  it('should not have "av-bad-input" class when the input is not "bad"', () => {
    options.context.FormCtrl.isBad.yo = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-bad-input')).to.be.true;
  });

  it('should allow custom classes', () => {
    const wrapper = shallow(<AvInput name="yo" className="yo-yo" />, options);

    expect(wrapper.hasClass('yo-yo')).to.be.true;
  });

  it('should pass props through to reactstrap\'s Input', () => {
    const wrapper = shallow(<AvInput name="yo" type="number" />, options);

    expect(wrapper.prop('type')).to.equal('number');
  });
});
