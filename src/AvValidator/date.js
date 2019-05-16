import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { isEmpty, isoDateFormat } from './utils';

dayjs.extend(customParseFormat);

const defaultFormat = 'MM/DD/YYYY';

export default function validate(value, context, {format = defaultFormat, errorMessage = `Format needs to be ${format}`} = {}) {
  if (isEmpty(value)) return true;

  let date = dayjs(value, format);

  if(format === defaultFormat && !date.isValid()) {
    date = dayjs(value,isoDateFormat);
  }


  return date.isValid() || errorMessage;
}
