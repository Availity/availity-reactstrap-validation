import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import toNumber from 'lodash/toNumber';
import { isEmpty, isoDateFormat } from './utils';
import maxchecked from './maxchecked';

dayjs.extend(isSameOrBefore);

export default function validate(value, context, constraint = {}, input = {}) {
  if (Array.isArray(input.value)) {
    return maxchecked(value, context, constraint, input);
  }

  if (isEmpty(value)) return true;

  if ((input.validations && input.validations.date) ||
    (input.props && input.props.type && input.props.type.toLowerCase() === 'date')) {
    return dayjs(value, [isoDateFormat, constraint.format || 'MM/DD/YYYY'], true).isSameOrBefore(constraint.value, 'day') || constraint.errorMessage || false;
  }

  const number = toNumber(value);

  return (!isNaN(number) && isFinite(number) && number <= toNumber(constraint.value)) || constraint.errorMessage || false;
}
