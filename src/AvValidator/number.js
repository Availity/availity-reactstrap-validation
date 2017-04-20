import { isNumber, toNumber } from 'lodash';
import { isEmpty } from './utils';

export default function validate(value, context, {errorMessage = false} = {}) {
  if (isEmpty(value)) return true;

  const number = toNumber(value);

  return (isNumber(number) && !isNaN(number)) || errorMessage;
}
