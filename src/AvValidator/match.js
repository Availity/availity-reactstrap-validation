import { isEmpty } from './utils';

export default function validate(value, context, constraint = {}) {
  return isEmpty(value) || value === context[constraint.value] || constraint.errorMessage || false;
}
