import {AvValidator} from 'availity-reactstrap-validation';

const fn = AvValidator.match;
const now = new Date();
const context = {
  field1: "",
  field2: "something",
  field3: now,
  field4: 4,
  field5: {value: "something"},
};

describe('Match Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('should return false by default when fields do not match', () => {
    expect(fn('something', context, {value: 'field1'})).to.be.false;
  });

  it('should return custom error message if provided when fields do not match', () => {
    expect(fn('something', context, {value: 'field1', errorMessage: 'No match!'})).to.equal('No match!');
  });

  it('should match a string to a string', () => {
    expect(fn(context.field2, context, {value: 'field2'})).to.be.true;
  });

  it('should match an object to an object', () => {
    expect(fn(context.field3, context, {value: 'field3'})).to.be.true;
  });

  it('should match a number to a number', () => {
    expect(fn(context.field4, context, {value: 'field4'})).to.be.true;
  });

  it('should not match a string to a number', () => {
    expect(fn('4', context, {value: 'field4'})).to.be.false;
  });

  it('should not match a string to an object', () => {
    expect(fn('something', context, {value: 'field5'})).to.be.false;
  });

  it('should not match something to nothing', () => {
    expect(fn('something', context, {value: 'field1'})).to.be.false;
  });
});
