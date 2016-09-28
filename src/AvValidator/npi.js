import { isEmpty } from './utils';

const INTEGER_REGEX = /^\d*$/;

export default function validate(value, context, {errorMessage = false} = {}) {
  if (isEmpty(value)) return true;

  value = value + '';

  if (!INTEGER_REGEX.test(value) || value.length !== 10) {
    return errorMessage;
  }

  const firstDigit = value.charAt(0);
  if (['1', '2', '3', '4'].indexOf(firstDigit) < 0) {
    return errorMessage;
  }

  const digit = parseInt(value.charAt(9), 10);
  value = value.substring(0, 9);
  value = `80840${value}`;

  let alternate = true;
  let total = 0;

  for (let i = value.length; i > 0; i--) {
    let next = parseInt(value.charAt(i - 1), 10);
    if (alternate) {
      next = next * 2;
      if (next > 9) {
        next = (next % 10) + 1;
      }
    }
    total += next;
    alternate = !alternate;
  }

  const roundUp = Math.ceil(total / 10) * 10;
  const calculatedCheck = roundUp - total;

  return calculatedCheck === digit || errorMessage;
}
