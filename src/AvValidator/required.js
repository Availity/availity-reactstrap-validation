import { isEmpty } from './utils';

export default function validate(value, context, {errorMessage = false} = {}) {
  return !isEmpty(value) || errorMessage || false;
}
