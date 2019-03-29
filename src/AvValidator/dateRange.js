import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { isEmpty, isoDateFormat } from './utils';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

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
  return setMin(dayjs().add(start.value, start.units));
}

function getEndDate(end) {
  return setMax(dayjs().add(end.value, end.units));
}

export default function validate(value, context, { format = 'MM/DD/YYYY', displayFormat = 'MM/DD/YYYY', start = {}, end = {}, errorMessage } = {}) {
  if (isEmpty(value)) return true;

  let startDate;
  let endDate;
  
  let date = dayjs(value,format);

  if(!date.isValid()) {
    date = dayjs(value,isoDateFormat)
  }
  date = setMin(date);
  
  if (!isEmpty(start.units) && !isEmpty(end.units)) {
    startDate = getStartDate(start);
    endDate = getEndDate(end);
  } else {
    startDate = dayjs(start.value, start.format || format);
    endDate = setMax(dayjs(end.value, end.format || format));
  }
  errorMessage = errorMessage || `Date must be between ${startDate.format(displayFormat)} and ${endDate.format(displayFormat)}`;
  return (date.isValid() &&
    (date.isBetween(startDate, endDate, 'day') || date.isSame(startDate, 'day') || date.isSame(endDate, 'day'))) ||
    errorMessage;
}
