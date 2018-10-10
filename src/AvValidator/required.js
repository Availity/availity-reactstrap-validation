import { isEmpty } from './utils';

export default function validate(value, context, {value: enabled = true, errorMessage = false} = {}) {
  return !enabled || !isEmpty(value) || errorMessage || false;
}
