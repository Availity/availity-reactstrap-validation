import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
/* global document */
export const isoDateFormat = 'YYYY-MM-DD';

export function isEmpty(value) {
  return isUndefined(value) || value === null || (isString(value) && value.trim() === '') || value === false || (Array.isArray(value) && value.length === 0 );
}

export const inputType = {date: false, number: false, time: false, month: false, week: false};

export const inputTypeOverride = (key, value) => {
  inputType[key] = value;
};

/* istanbul ignore next  */
if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
  const tester = document.createElement('input');

  for (const i in inputType) {
    if (inputType.hasOwnProperty(i)) {
      tester.setAttribute('type', i);
      tester.value = ':(';

      if (tester.type === i && tester.value === '') {
        inputType[i] = true;
      }
    }
  }
}
