import {AvValidator} from 'availity-reactstrap-validation';

const fn = AvValidator.npi;

describe('NPI Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('should return custom error message if provided when field is not valid', () => {
    expect(fn('1234', undefined, {errorMessage: 'Not an NPI!'})).to.equal('Not an NPI!');
  });

  it('should return false if NPI contains non-digits', () => {
    expect(fn('i2eh56789o')).to.be.false;
  });

  it('should return false if NPI is not 10 digits in length', () => {
    expect(fn('123456789')).to.be.false;
    expect(fn('12345678901')).to.be.false;
  });

  it('should return false if NPI does not start with a 1, 2, 3, or 4', () => {
    expect(fn('5678901234')).to.be.false;
  });

  it('should return false if NPI checksum does not match check digit', () => {
    expect(fn('1234567890')).to.be.false;
  });

  it('should return true if NPI is valid', () => {
    expect(fn('1234567893')).to.be.true;
  });
});
