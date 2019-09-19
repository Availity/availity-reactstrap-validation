import get from 'lodash/get';
import { isEmpty } from './utils';

export default function validate(value, context, constraint = {}) {
  return isEmpty(value) || value === get(context, constraint.value) || constraint.errorMessage || false;
}
