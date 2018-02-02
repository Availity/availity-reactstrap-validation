import { isEmpty } from './utils';
import get from 'lodash/get';

export default function validate(value, context, constraint = {}) {
  return isEmpty(value) || value === get(context, constraint.value) || constraint.errorMessage || false;
}
