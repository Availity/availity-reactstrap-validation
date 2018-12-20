import date from './date';
import dateRange from './dateRange';
import email from './email';
import match from './match';
import max from './max';
import maxlength from './maxlength';
import maxchecked from './maxchecked';
import min from './min';
import minlength from './minlength';
import minchecked from './minchecked';
import number from './number';
import npi from './npi';
import pattern from './pattern';
import phone from './phone';
import required from './required';
import step from './step';
import url from './url';

export default {
  date,
  datetime: date,
  dateRange,
  email,
  match,
  max,
  maxlength,
  maxLength: maxlength,
  maxChecked: maxchecked,
  min,
  minlength,
  minLength: minlength,
  minChecked: minchecked,
  number,
  npi,
  pattern,
  phone,
  tel: phone,
  required,
  step,
  url,
};
