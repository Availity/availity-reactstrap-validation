import React from 'react';
import { AvFeedback } from 'availity-reactstrap-validation';
import { FormFeedback } from 'reactstrap';

const state = {};
const options = {
  context: {
    FormCtrl: {},
    Group: {
      getInputState: () => state,
    },
  },
};

describe('AvFeedback', () => {
  describe('when there is an error', () => {
    beforeEach(() => {
      state.color = 'danger';
    });

    it('should render with "FormFeedback"', () => {
      const wrapper = shallow(<AvFeedback>Yo!</AvFeedback>, options);

      expect(wrapper.type()).to.equal(FormFeedback);
    });

    it('should render children inside the FormFeedback', () => {
      const wrapper = shallow(<AvFeedback>Yo!</AvFeedback>, options);

      expect(wrapper.prop('children')).to.equal('Yo!');
    });

    it('should render with the props passed in', () => {
      const wrapper = shallow(
        <AvFeedback style={{ textAlign: 'center' }}>Yo!</AvFeedback>,
        options
      );

      expect(wrapper.prop('style').textAlign).to.equal('center');
    });
  });
});
