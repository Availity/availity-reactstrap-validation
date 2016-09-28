import patternValidation from './pattern';

const EMAIL_REGEXP = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default function validate(value, context, { pattern = EMAIL_REGEXP, errorMessage = false } = {}) {
  return patternValidation(value, context, { value: pattern, errorMessage });
}
