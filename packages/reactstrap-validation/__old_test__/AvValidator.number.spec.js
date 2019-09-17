import {AvValidator} from '@availity/reactstrap-validation';

const fn = AvValidator.number;

describe('Number Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('should return custom error message if provided when field is not valid', () => {
    expect(fn('a4', undefined, {errorMessage: 'NaN!'})).to.equal('NaN!');
  });

  it('should accept numbers', () => {
    expect(fn(0)).to.be.true;
    expect(fn(-1)).to.be.true;
    expect(fn(1)).to.be.true;
    expect(fn(10)).to.be.true;
  });

  it('should accept decimals', () => {
    expect(fn(0.1)).to.be.true;
    expect(fn(-1.1)).to.be.true;
    expect(fn(1.1)).to.be.true;
    expect(fn(10.1)).to.be.true;
  });

  it('should accept number like strings', () => {
    expect(fn('0')).to.be.true;
    expect(fn('-1')).to.be.true;
    expect(fn('1')).to.be.true;
    expect(fn('10')).to.be.true;
  });

  it('should accept decimal like strings', () => {
    expect(fn('0.1')).to.be.true;
    expect(fn('-1.1')).to.be.true;
    expect(fn('1.1')).to.be.true;
    expect(fn('10.1')).to.be.true;
  });

  it('should not accept strings that are not like numbers', () => {
    expect(fn('a0')).to.be.false;
    expect(fn('-1b')).to.be.false;
    expect(fn('1c')).to.be.false;
    expect(fn('1d0')).to.be.false;
  });
});
