import {AvValidator} from '@availity/reactstrap-validation';

const fn = AvValidator.required;

describe('Required Validation', () => {
  it('should be invalid with ""', () => {
    expect(fn('')).to.be.false;
  });

  it('should be invalid with false', () => {
    expect(fn(false)).to.be.false;
  });

  it('should return custom error message if provided when field is not valid', () => {
    expect(fn('', undefined, {errorMessage: 'Invalid!'})).to.equal('Invalid!');
  });

  it('should be valid with 0', () => {
    expect(fn(0)).to.be.true;
  });

  it('should be valid with -1', () => {
    expect(fn(-1)).to.be.true;
  });

  it('should be valid with true', () => {
    expect(fn(true)).to.be.true;
  });
});
