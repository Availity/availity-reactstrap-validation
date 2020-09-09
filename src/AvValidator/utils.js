import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
/* global document */
export const isoDateFormat = 'YYYY-MM-DD';

export function isEmpty(value) {
  return (
    isUndefined(value) ||
    value === null ||
    (isString(value) && value.trim() === '') ||
    value === false ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function isDecimal(value) {
  return value % 1 !== 0;
}

export const inputType = { date: false, number: false, time: false, month: false, week: false };

export const inputTypeOverride = (key, value) => {
  inputType[key] = value;
};

/* istanbul ignore next  */
if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
  const tester = document.createElement('input');

  Object.keys(inputType).forEach(i => {
    tester.setAttribute('type', i);
    tester.value = ':(';

    if (tester.type === i && tester.value === '') {
      inputType[i] = true;
    }
  });
}
