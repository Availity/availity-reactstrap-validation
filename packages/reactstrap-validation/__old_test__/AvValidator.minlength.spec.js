import {AvValidator} from '@availity/reactstrap-validation';

const fn = AvValidator.minlength;

describe('Min Length Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('have an alias of minLength', () => {
    expect(fn).to.equal(AvValidator.minLength);
  });

  it('should return true if the value length is greater than the constraint', () => {
    expect(fn('123456', undefined, {value: 5})).to.be.true;
  });

  it('should true if the value is the same as than the constraint', () => {
    expect(fn('12345', undefined, {value: 5})).to.be.true;
  });

  it('should return false by default when field is over the max', () => {
    expect(fn('1234', undefined, {value: 5})).to.be.false;
  });

  it('should return custom error message if provided when field is over the max', () => {
    expect(fn('1234', undefined, {value: 5, errorMessage: 'Too much!'})).to.equal('Too much!');
  });

  it('should accept string input', () => {
    expect(fn('123', undefined, {value: '5'})).to.be.false;
    expect(fn('123', undefined, {value: 5})).to.be.false;
    expect(fn('123', undefined, {value: '2'})).to.be.true;
    expect(fn('123', undefined, {value: 2})).to.be.true;
  });

  it('should accept string constraint input', () => {
    expect(fn('1', undefined, {value: '2'})).to.be.false;
    expect(fn('12345', undefined, {value: '2'})).to.be.true;
  });

  it('should not accept numeric input', () => {
    expect(fn(10, undefined, {value: '1'})).to.be.false;
    expect(fn(2, undefined, {value: 1})).to.be.false;
  });

  it('should accept numeric constraint input', () => {
    expect(fn('12345', undefined, {value: 20})).to.be.false;
    expect(fn('12345', undefined, {value: 3})).to.be.true;
  });

  it('should accept non numeric input', () => {
    expect(fn('1a0', undefined, {value: 2})).to.be.true;
    expect(fn('001', undefined, {value: 2})).to.be.true;
    expect(fn('1.1.1', undefined, {value: 3})).to.be.true;
  });
});
