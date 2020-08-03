import toNumber from 'lodash/toNumber';
import { isEmpty } from './utils';

function getDecCount(val) {
  const valStr = val.toString();
  if (valStr.indexOf('e-') > -1) {
    const valArr = valStr.split('e-');
    return parseInt((valArr[0].split('.')[1] || '').length, 10) + parseInt(valArr[1], 10);
  }
  return (valStr.split('.')[1] || '').length;
}

// http://stackoverflow.com/a/31711034/1873485
function floatSafeRemainder(val, step) {
  const valDecCount = getDecCount(val);
  const stepDecCount = getDecCount(step);
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace('.', ''), 10);
  const stepInt = parseInt(step.toFixed(decCount).replace('.', ''), 10);
  return (valInt % stepInt) / (10 ** decCount);
}

export default function validate(value, context, constraint = {}) {
  if (isEmpty(value)) return true;

  return floatSafeRemainder(toNumber(value), toNumber(constraint.value)) === 0 || constraint.errorMessage || false;
}
