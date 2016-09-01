import React from 'react';
import { shallow } from 'enzyme';
import { AvRadio } from 'availity-reactstrap-validation';
import { Input } from 'reactstrap';

let options;

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

});
