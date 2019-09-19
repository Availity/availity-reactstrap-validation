import {AvValidator} from '@availity/reactstrap-validation';

const fn = AvValidator.minChecked;

describe('Min Checked Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('have an alias of minChecked', () => {
    expect(fn).to.equal(AvValidator.minChecked);
  });

  it('should return true if the value is greater than the constraint', () => {
    expect(fn(undefined, undefined, {value: 1}, {value: ['a', 'b']})).to.be.true;
  });

  it('should return true if the value is the same as than the constraint', () => {
    expect(fn(undefined, undefined, {value: 1}, {value: ['a']})).to.be.true;
  });

  it('should return false when field is under the min', () => {
    expect(fn(undefined, undefined, {value: 2}, {value: ['a']})).to.be.false;
  });

  it('should return custom error message if provided when field is under the min', () => {
    expect(fn(undefined, undefined, {value: 5, errorMessage: 'Too much!'}, {value: ['a']})).to.equal('Too much!');
  });

  it('should accept string constraint input', () => {
    expect(fn(undefined, undefined, {value: '1'}, {value: ['a']})).to.be.true;
    expect(fn(undefined, undefined, {value: '20'}, {value: ['a']})).to.be.false;
  });

  it('should accept numeric constraint input', () => {
    expect(fn(undefined, undefined, {value: 1}, {value: ['a']})).to.be.true;
    expect(fn(undefined, undefined, {value: 20}, {value: ['a']})).to.be.false;
  });

  it('should not accept non-numeric constraint input', () => {
    expect(fn(undefined, undefined, {value: '1a'}, {value: ['a']})).to.be.false;
    expect(fn(undefined, undefined, {value: 'a1'}, {value: ['a']})).to.be.false;
    expect(fn(undefined, undefined, {value: '1.1.1'}, {value: ['a']})).to.be.false;
  });

  it('should not accept decimal constraint input', () => {
    expect(fn(undefined, undefined, {value: 0.2}, {value: ['a']})).to.be.false;
    expect(fn(undefined, undefined, {value: '2.2'}, {value: ['a']})).to.be.false;
    expect(fn(undefined, undefined, {value: 20.2}, {value: ['a', 'b', 'c']})).to.be.false;
    expect(fn(undefined, undefined, {value: '20.2'}, {value: ['a', 'b', 'c']})).to.be.false;
  });
});
