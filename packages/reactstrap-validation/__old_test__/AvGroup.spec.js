import React from 'react';
import { shallow, mount } from 'enzyme';
import { AvGroup } from '@availity/reactstrap-validation';
import { FormGroup } from 'reactstrap';

describe('AvGroup', function() {
  beforeEach(() => {
    this.inputState = {color:'danger'};
    this.props = {
      name: 'fieldName',
    };
    this.registerSpy = sinon.spy();
    this.context = {
      FormCtrl: {
        getInputState: sinon.stub().returns(this.inputState),
        register: this.registerSpy,
      },
    };
    this.options = {context: this.context};
  });

  it('should render with "FormGroup"', () => {
    const wrapper = shallow(<AvGroup>Yo!</AvGroup>, this.options);

    expect(wrapper.type()).to.equal(FormGroup);
  });

  it('should render color prop based on inputState', () => {
    const wrapper = shallow(<AvGroup>Yo!</AvGroup>, this.options);

    expect(wrapper.prop('className')).to.equal(`text-${this.inputState.color}`);
  });

  it('should render children inside the FormGroup', () => {
    const wrapper = shallow(<AvGroup>Yo!</AvGroup>, this.options);

    expect(wrapper.prop('children')).to.equal('Yo!');
  });

  it('should render with the props passed in', () => {
    const wrapper = shallow(<AvGroup style={{textAlign: 'center'}}>Yo!</AvGroup>, this.options);

    expect(wrapper.prop('style').textAlign).to.equal('center');
  });

  it('should intercept an input registration', () => {
    const wrapper = mount(<AvGroup style={{textAlign: 'center'}}>Yo!</AvGroup>, this.options);
    expect(wrapper.node.FormCtrl.register).to.not.equal(this.registerSpy);
    const input  = {props: this.props};
    wrapper.node.FormCtrl.register(input);
    expect(wrapper.state('input')).to.equal(input);
    expect(this.registerSpy).to.have.been.calledWith(input);
  });
});
