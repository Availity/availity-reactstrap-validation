import {AvValidator} from 'availity-reactstrap-validation';

const fn = AvValidator.pattern;

describe('Pattern Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('should return custom error message if provided when field is not valid', () => {
    expect(fn('at3', undefined, {value: /^\d$/, errorMessage: 'Invalid!'})).to.equal('Invalid!');
  });

  it('should accept regex objects', () => {
    expect(fn('3', undefined, {value: /^\d$/})).to.be.true;
    expect(fn('a', undefined, {value: /^\d$/})).to.be.false;
  });

  it('should accept regex like strings', () => {
    expect(fn('3', undefined, {value: '/^\\d$/'})).to.be.true;
    expect(fn('a', undefined, {value: '/^\\d$/'})).to.be.false;
  });

  it('should accept somewhat regex like strings', () => {
    expect(fn('3', undefined, {value: '^\\d$'})).to.be.true;
    expect(fn('a', undefined, {value: '^\\d$'})).to.be.false;
  });

  it('should accept and array of regex to match at least one of', () => {
    expect(fn('3.4', undefined, {value: ['^\\d$', /^\d\.\d$/, '/^\\d\.\\d\.\\d$/']})).to.be.true;
    expect(fn('3.4', undefined, {value: ['^\\d$', /^\d\.\d$/, '/^\\d\.\\d\.\\d$/']})).to.be.true;
    expect(fn('3.4.5', undefined, {value: ['^\\d$', /^\d\.\d$/, '/^\\d\.\\d\.\\d$/']})).to.be.true;
    expect(fn('3.a.b', undefined, {value: ['^\\d$', /^\d\.\d$/, '/^\\d\.\\d\.\\d$/']})).to.be.false;
  });
});
