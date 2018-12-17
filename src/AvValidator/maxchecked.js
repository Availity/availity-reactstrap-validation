import toNumber from 'lodash/toNumber';
import { isEmpty, isDecimal } from './utils';

export default function validate(value, context, constraint = {}, input = {}) {
  if (isEmpty(input.value)) return true;

  const max = toNumber(constraint.value);

  return (
    (!isNaN(max) && isFinite(max) && !isDecimal(max) && max >= input.value.length) ||
    constraint.errorMessage ||
    false
  );
}
