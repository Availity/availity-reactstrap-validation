import isString from 'lodash.isstring';
import isUndefined from 'lodash.isundefined';
/* global document */
export const isoDateFormat = 'YYYY-MM-DD';

export function isEmpty(value) {
  return isUndefined(value) || (isString(value) && value.trim() === '') || value === false;
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
      tester.type = i;
      tester.value = ':(';

      if (tester.type === i && tester.value === '') {
        inputType[i] = true;
      }
    }
  }
}
