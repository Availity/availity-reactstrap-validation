import React from 'react';
import { shallow } from 'enzyme';
import { AvInput } from 'availity-reactstrap-validation';
import { Input } from 'reactstrap';

let options;

describe('AvInput', () => {
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
        FormCtrl: {
          inputs: {},
          getDefaultValue: () => {},
          getInputState: () => {},
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
          validationEvent: () => {},
          parent: null,
        },
      },
    };
  });

  it('should render a reactstrap Input', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.type()).to.equal(Input);
  });

  it('should have "is-untouched" class when untouched', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);
    expect(wrapper.hasClass('is-untouched')).to.be.true;
    expect(wrapper.hasClass('is-touched')).to.be.false;
  });

  it('should have "is-pristine" class when not dirty', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('is-pristine')).to.be.true;
    expect(wrapper.hasClass('is-dirty')).to.be.false;
  });

  it('should have "av-valid" not "is-invalid" class when valid', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-valid')).to.be.true;
    expect(wrapper.hasClass('is-invalid')).to.be.false;
  });

  it('should not have "is-bad-input" class when the input is not "bad"', () => {
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('is-bad-input')).to.be.false;
  });

  it('should have "is-touched" class when touched', () => {
    touched = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('is-untouched')).to.be.false;
    expect(wrapper.hasClass('is-touched')).to.be.true;
  });

  it('should have "is-pristine" class when not dirty', () => {
    dirty = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('is-pristine')).to.be.false;
    expect(wrapper.hasClass('is-dirty')).to.be.true;
  });

  it('should have "is-invalid" not "av-valid" class when invalid and touched', () => {
    error = true;
    touched = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('av-valid')).to.be.false;
    expect(wrapper.hasClass('is-invalid')).to.be.true;
  });

  it('should not have "is-bad-input" class when the input is not "bad"', () => {
    bad = true;
    const wrapper = shallow(<AvInput name="yo" />, options);

    expect(wrapper.hasClass('is-bad-input')).to.be.true;
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
