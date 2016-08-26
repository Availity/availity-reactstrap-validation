import isString from 'lodash.isstring';
import isUndefined from 'lodash.isundefined';

export const isoDateFormat = 'YYYY-MM-DD';

export function isEmpty (value) {
  return isUndefined(value) || (isString(value) && value.trim() === '') || value === false;
}

export const inputType = {date: false, number: false, time: false, month: false, week: false};

export const inputTypeOverride = (key, value) => {
  inputType[key] = value;
};


