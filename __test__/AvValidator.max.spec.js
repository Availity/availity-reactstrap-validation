import {AvValidator} from 'availity-reactstrap-validation';

const fn = AvValidator.max;

describe('Max Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('should accept input array as an alias for maxChecked', () => {
    expect(fn(undefined, undefined, {value: 1}, {value: ['a', 'b']})).to.be.false;
    expect(fn(undefined, undefined, {value: 2}, {value: ['a']})).to.be.true;
  });

  it('should return true if the value is less than the constraint', () => {
    expect(fn(1, undefined, {value: 5})).to.be.true;
  });

  it('should true if the value is the same as than the constraint', () => {
    expect(fn(5, undefined, {value: 5})).to.be.true;
  });

  it('should return false by default when field is over the max', () => {
    expect(fn(10, undefined, {value: 5})).to.be.false;
  });

  it('should return custom error message if provided when field is over the max', () => {
    expect(fn(10, undefined, {value: 5, errorMessage: 'Too much!'})).to.equal('Too much!');
  });

  it('should accept string input', () => {
    expect(fn('1', undefined, {value: '2'})).to.be.true;
    expect(fn('1', undefined, {value: 2})).to.be.true;
    expect(fn('1', undefined, {value: '0'})).to.be.false;
    expect(fn('1', undefined, {value: 0})).to.be.false;
  });

  it('should accept string constraint input', () => {
    expect(fn('1', undefined, {value: '2'})).to.be.true;
    expect(fn(1, undefined, {value: '2'})).to.be.true;
    expect(fn('3', undefined, {value: '2'})).to.be.false;
    expect(fn(3, undefined, {value: '2'})).to.be.false;
  });

  it('should accept numeric input', () => {
    expect(fn(1, undefined, {value: '2'})).to.be.true;
    expect(fn(1, undefined, {value: 2})).to.be.true;
    expect(fn(1, undefined, {value: '0'})).to.be.false;
    expect(fn(1, undefined, {value: 0})).to.be.false;
  });

  it('should accept numeric constraint input', () => {
    expect(fn('1', undefined, {value: 2})).to.be.true;
    expect(fn(1, undefined, {value: 2})).to.be.true;
    expect(fn('3', undefined, {value: 2})).to.be.false;
    expect(fn(3, undefined, {value: 2})).to.be.false;
  });

  it('should not accept non numeric input', () => {
    expect(fn('1a', undefined, {value: 2})).to.be.false;
    expect(fn('a1', undefined, {value: 2})).to.be.false;
    expect(fn('1.1.1', undefined, {value: 2})).to.be.false;
  });

  it('should accept decimal input', () => {
    expect(fn('1.5', undefined, {value: 2})).to.be.true;
    expect(fn(1.5, undefined, {value: 2})).to.be.true;
    expect(fn('1.5', undefined, {value: 1})).to.be.false;
    expect(fn(1.5, undefined, {value: 1})).to.be.false;
  });

  it('should accept decimal constraint input', () => {
    expect(fn(1.5, undefined, {value: 2.2})).to.be.true;
    expect(fn(1.5, undefined, {value: '2.2'})).to.be.true;
    expect(fn(3.5, undefined, {value: 2.2})).to.be.false;
    expect(fn(3.5, undefined, {value: '2.2'})).to.be.false;
  });

  it('should compare dates when date validation is on', () => {
    expect(fn('2016-10-09', undefined, {value: '2016-10-10'}, {validations: {date: {value: true}}})).to.be.true;
    expect(fn('2016-10-10', undefined, {value: '2016-10-10'}, {validations: {date: {value: true}}})).to.be.true;
    expect(fn('2016-10-11', undefined, {value: '2016-10-10'}, {validations: {date: {value: true}}})).to.be.false;
    expect(fn('2016-10-12', undefined, {value: '2016-10-10'}, {validations: {date: {value: true}}})).to.be.false;
  });

  it('should compare dates when the field is of type date', () => {
    expect(fn('2016-10-09', undefined, {value: '2016-10-10'}, {props: {type: 'date'}})).to.be.true;
    expect(fn('2016-10-10', undefined, {value: '2016-10-10'}, {props: {type: 'date'}})).to.be.true;
    expect(fn('2016-10-11', undefined, {value: '2016-10-10'}, {props: {type: 'date'}})).to.be.false;
    expect(fn('2016-10-12', undefined, {value: '2016-10-10'}, {props: {type: 'date'}})).to.be.false;
  });
});
