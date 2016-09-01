import React from 'react';
import { shallow } from 'enzyme';
import { AvRadioGroup } from 'availity-reactstrap-validation';
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
    const wrapper = shallow(<AvRadioGroup name="yo" />, options);

    expect(wrapper.type()).to.not.eql(undefined);
  });

});
