import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import toNumber from 'lodash/toNumber';
import { isEmpty, isoDateFormat } from './utils';
import minchecked from './minchecked';

dayjs.extend(isSameOrAfter);

export default function validate(value, context, constraint = {}, input = {}) {
  if (Array.isArray(input.value)) {
    return minchecked(value, context, constraint, input);
  }

  if (isEmpty(value)) return true;

  if ((input.validations && input.validations.date) ||
    (input.props && input.props.type && input.props.type.toLowerCase() === 'date')) {
    return dayjs(value, [isoDateFormat, constraint.format || 'MM/DD/YYYY'], true).isSameOrAfter(constraint.value, 'day') || constraint.errorMessage || false;
  }

  const number = toNumber(value);

  return (!isNaN(number) && isFinite(number) && number >= toNumber(constraint.value)) || constraint.errorMessage || false;
}
