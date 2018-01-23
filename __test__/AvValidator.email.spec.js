import {AvValidator} from 'availity-reactstrap-validation';

const fn = AvValidator.email;

describe('Email Validation', () => {
  it('should not require a value', () => {
    expect(fn('')).to.be.true;
  });

  it('should return true for a valid email', () => {
    expect(fn('evan.sharp@availity.com')).to.be.true;
    expect(fn('evan.sharp+more-things@availity.com')).to.be.true;
    expect(fn('evan.sharp@availity.com.co')).to.be.true;
    expect(fn('evan.sharp@development.availity.com')).to.be.true;
    expect(fn('Evan.Sharp@Availity.com')).to.be.true;
  });

  it('should return false for an invalid email', () => {
    expect(fn('evan.sharp@availity')).to.be.false;
    expect(fn('evan.sharp@')).to.be.false;
    expect(fn('@availity.com')).to.be.false;
    expect(fn('evan.sharp@.com')).to.be.false;
    expect(fn('evan.sharp')).to.be.false;
    expect(fn('availity.com')).to.be.false;
    expect(fn('Evan@Sharp@Availity.com')).to.be.false;
  });
});
