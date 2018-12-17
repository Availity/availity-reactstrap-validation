import toNumber from 'lodash/toNumber';
import { isEmpty, isDecimal } from './utils';

export default function validate(value, context, constraint = {}, input = {}) {
  if (isEmpty(input.value)) return true;

  const min = toNumber(constraint.value);

  return (
    (!isNaN(min) && isFinite(min) && !isDecimal(min) && min <= input.value.length) ||
    constraint.errorMessage ||
    false
  );
}
