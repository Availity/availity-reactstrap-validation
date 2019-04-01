import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {AvValidator} from 'availity-reactstrap-validation';
import {inputTypeOverride} from 'availity-reactstrap-validation/AvValidator/utils';

dayjs.extend(customParseFormat);

const fn = AvValidator.dateRange;
const input = {props: {type: 'text'}};
const context = {};
let date0;
let date1;
let date2;

describe('Date Range Validation', () => {
  beforeEach(() => {
    date0 = dayjs(new Date());
    date1 = dayjs(new Date());
    date2 = dayjs(new Date());
  });

  it('should not require a value', () => {
    expect(fn('', context, undefined, input)).to.be.true;
  });

  describe('error message', () => {
    it('should allow the error message to be overridden', () => {
      expect(fn('abc 123', context, {errorMessage: 'Custom'}, input)).to.equal('Custom');
    });

    it('should use the custom format in the default message', () => {
      expect(fn('abc 123', context, {
        format: 'YYYY-MM-DD',
        displayFormat: 'YYYY-MM-DD',
        start: {value: '2014-10-12'},
        end: {value: '2015-10-12'}
      }, input)).to.equal('Date must be between 2014-10-12 and 2015-10-12');
    });

    it('should use the default format in the default message', () => {
      expect(fn('abc 123', context, {
        format: 'YYYY-MM-DD',
        start: {value: '2014-10-12'},
        end: {value: '2015-10-12'}
      }, input)).to.equal('Date must be between 10/12/2014 and 10/12/2015');
    });

  });

  describe('with units', () => {
    it('should return true when date is within range of the current date', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: -1, units: 'day'},
        end: {value: 1, units: 'day'}
      }, input)).to.be.true;
    });

    it('should return true when date is the same as the start date', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: 0, units: 'day'},
        end: {value: 1, units: 'day'}
      }, input)).to.be.true;
    });

    it('should return true when date is the same as the end date', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: -1, units: 'day'},
        end: {value: 0, units: 'day'}
      }, input)).to.be.true;
    });

    it('should return an error message when date is not within range of the current date', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: -5, units: 'day'},
        end: {value: -1, units: 'day'}
      }, input)).to.equal(`Date must be between ${date1.add(-5, 'day').format('MM/DD/YYYY')} and ${date2.add(-1, 'day').format('MM/DD/YYYY')}`);
    });
  });

  describe('without units', () => {
    it('should return true when date is within range of the current date', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: date1.add(-1, 'day').format('YYYY-MM-DD')},
        end: {value: date2.add(1, 'day').format('YYYY-MM-DD')}
      }, input)).to.be.true;
    });

    it('should return true when date is the same as the start date', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: date1.format('YYYY-MM-DD')},
        end: {value: date2.add(1, 'day').format('YYYY-MM-DD')}
      }, input)).to.be.true;
    });

    it('should return true when date is the same as the end date', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: date1.add(-1, 'day').format('YYYY-MM-DD')},
        end: {value: date2.format('YYYY-MM-DD')}
      }, input)).to.be.true;
    });

    it('should return an error message when date is not within range of the current date', () => {
      const dateOne = dayjs().add(-1,'day');
      const dateTwo = dayjs().add(-5,'day');

      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: dateOne.format('YYYY-MM-DD')},
        end: {value: dateTwo.format('YYYY-MM-DD')}
      }, input)).to.equal(`Date must be between ${dateOne.format('MM/DD/YYYY')} and ${dateTwo.format('MM/DD/YYYY')}`);
    });

    it('should allow the start and end formats to be different than the user format', () => {
      const dateOne = dayjs().add(-1,'day');
      const dateTwo = dayjs().add(-5,'day');

      expect(fn(date0.format('YYYY-MM-DD'), context, {
        format: 'YYYY-MM-DD',
        start: {value: dateOne.format('DD-MM-YYYY'), format: 'DD-MM-YYYY'},
        end: {value: dateTwo.format('YYYY/MM/DD'), format: 'YYYY/MM/DD'}
      }, input)).to.equal(`Date must be between ${dateOne.format('MM/DD/YYYY')} and ${dateTwo.format('MM/DD/YYYY')}`);
    });
  });

  describe('non-date input type', () => {
    beforeEach(() => {
      input.props.type = 'text';
    });

    it('should accept MM/DD/YYYY by default', () => {
      expect(fn(date0.format('MM/DD/YYYY'), context, {
        start: {value: -1, units: 'day'},
        end: {value: 1, units: 'day'}
      }, input)).to.be.true;
    });

    it('should accept YYYY-MM-DD by default', () => {
      expect(fn(date0.format('YYYY-MM-DD'), context, {
        start: {value: -1, units: 'day'},
        end: {value: 1, units: 'day'}
      }, input)).to.be.true;
    });

    it('should allow the format to be overridden', () => {
      expect(fn(date0.format('DD-MM-YYYY'), context, {
        format: 'DD-MM-YYYY',
        start: {value: -1, units: 'day'},
        end: {value: 1, units: 'day'}
      }, input)).to.be.true;
    });
  });

  describe('date input type', () => {
    describe('without browser date input type support', () => {
      beforeEach(() => {
        inputTypeOverride('date', false);
        input.props.type = 'date';
      });

      it('should accept MM/DD/YYYY by default', () => {
        expect(fn(date0.format('MM/DD/YYYY'), context, {
          start: {value: -1, units: 'day'},
          end: {value: 1, units: 'day'}
        }, input)).to.be.true;
      });

      it('should accept YYYY-MM-DD by default', () => {
        expect(fn(date0.format('YYYY-MM-DD'), context, {
          start: {value: -1, units: 'day'},
          end: {value: 1, units: 'day'}
        }, input)).to.be.true;
      });

      it('should allow the format to be overridden', () => {
        expect(fn(date0.format('DD-MM-YYYY'), context, {
          format: 'DD-MM-YYYY',
          start: {value: -1, units: 'day'},
          end: {value: 1, units: 'day'}
        }, input)).to.be.true;
      });
    });

    describe('with browser date input type support', () => {
      beforeEach(() => {
        inputTypeOverride('date', true);
        input.props.type = 'date';
      });

      it('should accept YYYY-MM-DD by default', () => {
        expect(fn(date0.format('YYYY-MM-DD'), context, {
          start: {value: -1, units: 'day'},
          end: {value: 1, units: 'day'}
        }, input)).to.be.true;
      });

      it('should accept MM/DD/YYYY by default', () => {
        expect(fn(date0.format('MM/DD/YYYY'), context, {
          start: {value: -1, units: 'day'},
          end: {value: 1, units: 'day'}
        }, input)).to.be.true;
      });

      it('should allow the format to be overridden', () => {
        expect(fn(date0.format('DD-MM-YYYY'), context, {
          format: 'DD-MM-YYYY',
          start: {value: -1, units: 'day'},
          end: {value: 1, units: 'day'}
        }, input)).to.be.true;
      });
    });
  });
});
