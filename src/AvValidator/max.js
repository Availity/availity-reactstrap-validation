import moment from 'moment';
import toNumber from 'lodash/toNumber';
import { isEmpty, isoDateFormat } from './utils';

export default function validate(value, context, constraint = {}, input = {}) {
  if (isEmpty(value)) return true;

  if ((input.validations && input.validations.date) ||
    (input.props && input.props.type && input.props.type.toLowerCase() === 'date')) {
    return moment(value, [isoDateFormat, constraint.format || 'MM/DD/YYYY'], true).isSameOrBefore(constraint.value, 'day');
  }

  const number = toNumber(value);

  return (!isNaN(number) && isFinite(number) && number <= toNumber(constraint.value)) || constraint.errorMessage || false;
}
