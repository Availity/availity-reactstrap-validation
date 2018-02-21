import moment from 'moment';
import { isEmpty, isoDateFormat } from './utils';

export default function validate(value, context, {format = 'MM/DD/YYYY', errorMessage = `Format needs to be ${format}`} = {}) {
  if (isEmpty(value)) return true;

  const date = moment(value, [isoDateFormat, format], true);

  return date.isValid() || errorMessage;
}
