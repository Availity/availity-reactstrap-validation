import toNumber from 'lodash.tonumber';
import { isEmpty } from './utils';

export default function validate (value, context, constraint = {}) {
  if (isEmpty(value)) return true;

  return floatSafeRemainder(toNumber(value), toNumber(constraint.value)) === 0 || constraint.errorMessage || false;
};

// http://stackoverflow.com/a/31711034/1873485
function floatSafeRemainder (val, step) {
  const valDecCount = (val.toString().split('.')[1] || '').length;
  const stepDecCount = (step.toString().split('.')[1] || '').length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace('.', ''));
  const stepInt = parseInt(step.toFixed(decCount).replace('.', ''));
  return (valInt % stepInt) / Math.pow(10, decCount);
}
