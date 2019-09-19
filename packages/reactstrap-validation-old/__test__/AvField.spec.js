import React from 'react';
import { shallow } from 'enzyme';
import {
  AvFeedback,
  AvField,
  AvGroup,
  AvInput,
} from '@availity/reactstrap-validation';
import { Label, FormText, Col } from 'reactstrap';

let state = {};
const options = {
  context: {
    FormCtrl: {
      getInputState: () => state,
    },
  },
};

const stdProps = { name: 'testing', label: 'Test Label' };

describe('AvField', function() {
  beforeEach(() => {
    state = {};
  });
  describe('structure', () => {
    describe('default', () => {
      describe('default', () => {
        beforeEach(() => {
          this.wrapper = shallow(<AvField {...stdProps}>Yo!</AvField>, options);
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render an "AvInput" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(AvInput);
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(2).type).throw;
        });
      });

      describe('grid', () => {
        beforeEach(() => {
          this.wrapper = shallow(
            <AvField {...stdProps} grid={{ xs: 8 }}>
              Yo!
            </AvField>,
            options
          );
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render a "Col" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(Col);
        });

        it('should render an "AvInput" inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(0)
              .type()
          ).to.equal(AvInput);
        });

        it('should not render any thing else inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(1)
              .type
          ).throw;
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(2).type).throw;
        });
      });
    });

    describe('with error message', () => {
      describe('default', () => {
        beforeEach(() => {
          state.errorMessage = 'error!';
          this.wrapper = shallow(<AvField {...stdProps}>Yo!</AvField>, options);
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render an "AvInput" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(AvInput);
        });

        it('should render an "AvFeedback" inside the AvGroup after the AvInput', () => {
          expect(this.wrapper.childAt(2).type()).to.equal(AvFeedback);
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(3).type).throw;
        });
      });

      describe('grid', () => {
        beforeEach(() => {
          state.errorMessage = 'error!';
          this.wrapper = shallow(
            <AvField {...stdProps} grid={{ xs: 8 }}>
              Yo!
            </AvField>,
            options
          );
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render a "Col" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(Col);
        });

        it('should render an "AvInput" inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(0)
              .type()
          ).to.equal(AvInput);
        });

        it('should render an "AvFeedback" inside the Col after the AvInput', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(1)
              .type()
          ).to.equal(AvFeedback);
        });

        it('should not render any thing else inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(2)
              .type
          ).throw;
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(2).type).throw;
        });
      });
    });

    describe('with help message', () => {
      describe('default', () => {
        beforeEach(() => {
          this.wrapper = shallow(
            <AvField {...stdProps} helpMessage="yo">
              Yo!
            </AvField>,
            options
          );
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render an "AvInput" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(AvInput);
        });

        it('should render an "FormText" inside the AvGroup after the AvInput', () => {
          expect(this.wrapper.childAt(2).type()).to.equal(FormText);
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(3).type).throw;
        });
      });

      describe('grid', () => {
        beforeEach(() => {
          this.wrapper = shallow(
            <AvField {...stdProps} grid={{ xs: 8 }} helpMessage="yo">
              Yo!
            </AvField>,
            options
          );
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render a "Col" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(Col);
        });

        it('should render an "AvInput" inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(0)
              .type()
          ).to.equal(AvInput);
        });

        it('should render an "FormText" inside the Col after the AvInput', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(1)
              .type()
          ).to.equal(FormText);
        });

        it('should not render any thing else inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(2)
              .type
          ).throw;
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(2).type).throw;
        });
      });
    });

    describe('with error and help message', () => {
      describe('default', () => {
        beforeEach(() => {
          state.errorMessage = 'error!';
          this.wrapper = shallow(
            <AvField {...stdProps} helpMessage="yo">
              Yo!
            </AvField>,
            options
          );
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render an "AvInput" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(AvInput);
        });

        it('should render an "AvFeedback" inside the AvGroup after the AvInput', () => {
          expect(this.wrapper.childAt(2).type()).to.equal(AvFeedback);
        });

        it('should render an "FormText" inside the AvGroup after the AvInput', () => {
          expect(this.wrapper.childAt(3).type()).to.equal(FormText);
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(4).type).throw;
        });
      });

      describe('grid', () => {
        beforeEach(() => {
          state.errorMessage = 'error!';
          this.wrapper = shallow(
            <AvField {...stdProps} grid={{ xs: 8 }} helpMessage="yo">
              Yo!
            </AvField>,
            options
          );
        });

        it('should render with "AvGroup"', () => {
          expect(this.wrapper.type()).to.equal(AvGroup);
        });

        it('should render a "Label" first inside the AvGroup', () => {
          expect(this.wrapper.childAt(0).type()).to.equal(Label);
        });

        it('should render a "Col" inside the AvGroup after the label', () => {
          expect(this.wrapper.childAt(1).type()).to.equal(Col);
        });

        it('should render an "AvInput" inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(0)
              .type()
          ).to.equal(AvInput);
        });

        it('should render an "AvFeedback" inside the Col after the AvInput', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(1)
              .type()
          ).to.equal(AvFeedback);
        });

        it('should render an "FormText" inside the Col after the AvInput', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(2)
              .type()
          ).to.equal(FormText);
        });

        it('should not render any thing else inside the Col', () => {
          expect(
            this.wrapper
              .childAt(1)
              .childAt(3)
              .type
          ).throw;
        });

        it('should not render any thing else', () => {
          expect(this.wrapper.childAt(2).type).throw;
        });
      });
    });
  });

  describe('AvGroup', () => {
    it('should pass the "row" prop through', () => {
      const wrapper = shallow(
        <AvField {...stdProps} grid={{ xs: 8 }}>
          Yo!
        </AvField>,
        options
      );
      expect(wrapper.prop('row')).to.be.true;
    });

    it('should pass the "disabled" prop through', () => {
      const wrapper = shallow(
        <AvField {...stdProps} disabled>
          Yo!
        </AvField>,
        options
      );
      expect(wrapper.prop('disabled')).to.be.true;
    });

    it('should spread the "groupAttrs" prop on it', () => {
      const wrapper = shallow(
        <AvField {...stdProps} groupAttrs={{ className: 'yo' }}>
          Yo!
        </AvField>,
        options
      );
      expect(wrapper.hasClass('yo')).to.be.true;
    });

    it('should not get other props passed through', () => {
      const wrapper = shallow(<AvField {...stdProps}>Yo!</AvField>, options);
      expect(wrapper.prop('label')).to.be.undefined;
    });
  });

  describe('Label', () => {
    it('should pass the "id" prop as the "for" prop', () => {
      const label = shallow(
        <AvField {...stdProps} id="myId">
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('for')).to.equal('myId');
    });

    it('should use the "name" props as the "for" prop when id is not provided', () => {
      const label = shallow(
        <AvField {...stdProps}>Yo!</AvField>,
        options
      ).childAt(0);
      expect(label.prop('for')).to.equal(stdProps.name);
    });

    it('should use the "label" prop as the children', () => {
      const label = shallow(
        <AvField {...stdProps}>Yo!</AvField>,
        options
      ).childAt(0);
      expect(label.prop('children')).to.equal(stdProps.label);
    });

    it('should get the "size" prop', () => {
      const label = shallow(
        <AvField {...stdProps} size="amazing">
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('size')).to.equal('amazing');
    });

    it('should use the labelHidden prop as the hidden prop', () => {
      const label = shallow(
        <AvField {...stdProps} labelHidden>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('hidden')).to.be.true;
    });

    it('should spread the "labelAttrs" prop on it', () => {
      const label = shallow(
        <AvField {...stdProps} labelAttrs={{ className: 'yo' }}>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.hasClass('yo')).to.be.true;
    });

    it('should not get other props passed through', () => {
      const label = shallow(
        <AvField {...stdProps} id="myId">
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('id')).to.be.undefined;
    });

    it('should have xs prop set when grid is set', () => {
      const label = shallow(
        <AvField {...stdProps} grid={{ xs: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('xs')).to.equal(4);
    });

    it('should have sm prop set when grid is set', () => {
      const label = shallow(
        <AvField {...stdProps} grid={{ sm: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('sm')).to.equal(4);
    });

    it('should have md prop set when grid is set', () => {
      const label = shallow(
        <AvField {...stdProps} grid={{ md: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('md')).to.equal(4);
    });

    it('should have lg prop set when grid is set', () => {
      const label = shallow(
        <AvField {...stdProps} grid={{ lg: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('lg')).to.equal(4);
    });

    it('should have xl prop set when grid is set', () => {
      const label = shallow(
        <AvField {...stdProps} grid={{ xl: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('xl')).to.equal(4);
    });

    it('should have all the col prop set when grid is set', () => {
      const label = shallow(
        <AvField {...stdProps} grid={{ xs: 6, md: 7, xl: 8, other: 10 }}>
          Yo!
        </AvField>,
        options
      ).childAt(0);
      expect(label.prop('xs')).to.equal(6);
      expect(label.prop('md')).to.equal(5);
      expect(label.prop('xl')).to.equal(4);
      expect(label.prop('other')).to.be.undefined;
    });
  });

  describe('AvInput', () => {
    it('should get other props passed through', () => {
      const input = shallow(
        <AvField {...stdProps} style={{ textAlign: 'center' }}>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('style').textAlign).to.equal('center');
    });

    it('should set id to value of name if id is not provided', () => {
      const input = shallow(
        <AvField {...stdProps}>Yo!</AvField>,
        options
      ).childAt(1);
      expect(input.prop('id')).to.equal(stdProps.name);
    });

    it('should set "disabled" prop if provided', () => {
      const input = shallow(
        <AvField {...stdProps} disabled>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('disabled')).to.be.true;
    });

    it('should set "readOnly" prop if provided', () => {
      const input = shallow(
        <AvField {...stdProps} readOnly>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('readOnly')).to.be.true;
    });

    it('should set "size" prop if provided', () => {
      const input = shallow(
        <AvField {...stdProps} size="amazing">
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('size')).to.equal('amazing');
    });

    it('should have xs prop set when grid is set', () => {
      const input = shallow(
        <AvField {...stdProps} grid={{ xs: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('xs')).to.equal(8);
    });

    it('should have sm prop set when grid is set', () => {
      const input = shallow(
        <AvField {...stdProps} grid={{ sm: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('sm')).to.equal(8);
    });

    it('should have md prop set when grid is set', () => {
      const input = shallow(
        <AvField {...stdProps} grid={{ md: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('md')).to.equal(8);
    });

    it('should have lg prop set when grid is set', () => {
      const input = shallow(
        <AvField {...stdProps} grid={{ lg: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('lg')).to.equal(8);
    });

    it('should have xl prop set when grid is set', () => {
      const input = shallow(
        <AvField {...stdProps} grid={{ xl: 8 }}>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('xl')).to.equal(8);
    });

    it('should have all the col prop set when grid is set', () => {
      const input = shallow(
        <AvField {...stdProps} grid={{ xs: 6, md: 7, xl: 8, other: 10 }}>
          Yo!
        </AvField>,
        options
      ).childAt(1);
      expect(input.prop('xs')).to.equal(6);
      expect(input.prop('md')).to.equal(7);
      expect(input.prop('xl')).to.equal(8);
      expect(input.prop('other')).to.be.undefined;
    });
  });
});
