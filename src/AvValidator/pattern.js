import isRegExp from 'lodash.isregexp';
import { isEmpty } from './utils';

const REGEX = /^\/(.*)\/([gim]*)$/; // regular expression to test a regular expression

export default function validate (value, context, constraint = {}) {
  if (isEmpty(value)) return true;

  const values = Array.isArray(constraint.value) ? constraint.value : [constraint.value];

  return values.some((expression) => asRegExp(expression).test(value)) || constraint.errorMessage || false;
}

function asRegExp (pattern) {
  // if regex then return it
  if (isRegExp(pattern)) {
    return pattern;
  }

  // if string then test for valid regex then convert to regex and return
  const match = pattern.match(REGEX);
  if (match) {
    return new RegExp(match[1], match[2]);
  }

  return new RegExp(pattern);
}
