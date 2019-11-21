import moment from 'moment';
import { isEmpty, isoDateFormat } from './utils';

function setMin(value) {
  value.set('hours', 0);
  value.set('minutes', 0);
  value.set('seconds', 0);

  return value;
}

function setMax(value) {
  value.set('hours', 23);
  value.set('minutes', 59);
  value.set('seconds', 59);

  return value;
}


function getStartDate(start) {
  return setMin(moment().add(start.value, start.units));
}

function getEndDate(end) {
  return setMax(moment().add(end.value, end.units));
}

export default function validate(value, context, { format = 'MM/DD/YYYY', displayFormat = 'MM/DD/YYYY', start = {}, end = {}, errorMessage } = {}) {
  if (isEmpty(value)) return true;

  let startDate;
  let endDate;

  const date = moment(value, [isoDateFormat, format], true);
  setMin(date);

  if (!isEmpty(start.units) && !isEmpty(end.units)) {
    startDate = getStartDate(start);
    endDate = getEndDate(end);
  } else {
    startDate = moment(start.value, start.format || format);
    endDate = setMax(moment(end.value, end.format || format));
  }
  errorMessage = errorMessage || `Date must be between ${startDate.format(displayFormat)} and ${endDate.format(displayFormat)}`;
  return (date.isValid() &&
    (date.isBetween(startDate, endDate, 'day') || date.isSame(startDate, 'day') || date.isSame(endDate, 'day'))) ||
    errorMessage;
}
