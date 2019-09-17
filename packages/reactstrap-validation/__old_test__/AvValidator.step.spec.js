import {AvValidator} from '@availity/reactstrap-validation';

const fn = AvValidator.step;

describe('Step Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });


  it('should return custom error message if provided when field is not valid', () => {
    expect(fn(12, undefined, {value: 7, errorMessage: 'Get to steppin!'})).to.equal('Get to steppin!');
  });

  it('should accept numbers', () => {
    expect(fn(10, undefined, {value: 5})).to.be.true;
    expect(fn(11, undefined, {value: 5})).to.be.false;
    expect(fn(10, undefined, {value: 6})).to.be.false;
    expect(fn(10, undefined, {value: 2})).to.be.true;

    expect(fn('10', undefined, {value: 5})).to.be.true;
    expect(fn('11', undefined, {value: 5})).to.be.false;
    expect(fn('10', undefined, {value: 6})).to.be.false;
    expect(fn('10', undefined, {value: 2})).to.be.true;

    expect(fn(10, undefined, {value: '5'})).to.be.true;
    expect(fn(11, undefined, {value: '5'})).to.be.false;
    expect(fn(10, undefined, {value: '6'})).to.be.false;
    expect(fn(10, undefined, {value: '2'})).to.be.true;
  });

  it('should accept decimals', () => {
    expect(fn(10.2, undefined, {value: 5.1})).to.be.true;
    expect(fn(11.5, undefined, {value: 5.3})).to.be.false;
    expect(fn(10.5, undefined, {value: 6.7})).to.be.false;
    expect(fn(10.5, undefined, {value: 2.1})).to.be.true;
    expect(fn(0.00000002, undefined, {value: 0.00000001})).to.be.true;
    expect(fn(0.000000011, undefined, {value: 0.00000001})).to.be.false;

    expect(fn('10.2', undefined, {value: 5.1})).to.be.true;
    expect(fn('11.5', undefined, {value: 5.55})).to.be.false;
    expect(fn('10.55', undefined, {value: 6.2})).to.be.false;
    expect(fn('10.5', undefined, {value: 2.1})).to.be.true;
    expect(fn('0.00000002', undefined, {value: 0.00000001})).to.be.true;
    expect(fn('0.000000011', undefined, {value: 0.00000001})).to.be.false;

    expect(fn(10.2, undefined, {value: '5.1'})).to.be.true;
    expect(fn(11.5, undefined, {value: '5.4'})).to.be.false;
    expect(fn(10.5, undefined, {value: '6.7'})).to.be.false;
    expect(fn(10.5, undefined, {value: '2.1'})).to.be.true;
    expect(fn(0.00000002, undefined, {value: '0.00000001'})).to.be.true;
    expect(fn(0.000000011, undefined, {value: '0.00000001'})).to.be.false;
  });
});
