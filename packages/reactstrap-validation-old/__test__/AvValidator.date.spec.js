import {AvValidator} from '@availity/reactstrap-validation';
import {inputTypeOverride} from '@availity/reactstrap-validation/AvValidator/utils';

const fn = AvValidator.date;
const input = {props: {type: 'text'}};
const context = {};

describe('Date Validation', () => {
  it('should not require a value', () => {
    expect(fn('', context, undefined, input)).to.be.true;
  });

  describe('error message', () => {
    it('should allow the error message to be overridden', () => {
      expect(fn('abc 123', context, {errorMessage: 'Custom'}, input)).to.equal('Custom');
    });

    it('should use the custom format in the default message', () => {
      expect(fn('abc 123', context, {format: 'YYYY-MM-DD'}, input)).to.equal('Format needs to be YYYY-MM-DD');
    });

    it('should use the default format in the default message', () => {
      expect(fn('abc 123', context, undefined, input)).to.equal('Format needs to be MM/DD/YYYY');
    });

  });

  describe('non-date input type', () => {
    beforeEach(() => {
      input.props.type = 'text';
    });

    it('should accept MM/DD/YYYY format by default', () => {
      expect(fn('10/12/2014', context, undefined, input)).to.be.true;
    });

    it('should accept ISO (YYYY-MM-DD) format by default', () => {
      expect(fn('2014-10-12', context, undefined, input)).to.be.true;
    });

    it('should allow format to be customized', () => {
      expect(fn('2014-12-14', context, {format: 'YYYY-MM-DD'}, input)).to.be.true;
    });

    it('should ensure the format matches the customized format', () => {
      expect(fn('10/12/2014', context, {format: 'YYYY-MM-DD'}, input)).to.equal('Format needs to be YYYY-MM-DD');
    });
  });

  describe('date input type', () => {
    describe('without browser date input type support', () => {
      beforeEach(() => {
        inputTypeOverride('date', false);
        input.props.type = 'date';
      });

      it('should accept MM/DD/YYYY format by default', () => {
        expect(fn('10/12/2014', context, undefined, input)).to.be.true;
      });

      it('should accept ISO (YYYY-MM-DD) format by default', () => {
        expect(fn('2014-10-12', context, undefined, input)).to.be.true;
      });

      it('should allow format to be customized', () => {
        expect(fn('2014-12-14', context, {format: 'YYYY-MM-DD'}, input)).to.be.true;
      });

      it('should ensure the format matches the customized format', () => {
        expect(fn('10/12/2014', context, {format: 'YYYY-MM-DD'}, input)).to.equal('Format needs to be YYYY-MM-DD');
      });
    });

    describe('with browser date input type support', () => {
      beforeEach(() => {
        inputTypeOverride('date', true);
        input.props.type = 'date';
      });

      it('should accept ISO (YYYY-MM-DD) format by default', () => {
        expect(fn('2014-10-12', context, undefined, input)).to.be.true;
      });

      it('should accept MM/DD/YYYY format by default', () => {
        expect(fn('10/12/2014', context, undefined, input)).to.be.true;
      });

      it('should allow format to be customized', () => {
        expect(fn('10-12-2014', context, {format: 'DD-MM-YYYY'}, input)).to.be.true;
      });
    });
  });
});
