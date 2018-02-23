
import PropTypes from 'prop-types';

export const eventProps = PropTypes.oneOf([
  'onInput', 'onChange', 'onBlur', 'onFocus',
]);

const validatorProp = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);

const validationStandardShape = PropTypes.shape({
  fields: PropTypes.arrayOf(PropTypes.string),
  events: eventProps,
  validator: validatorProp,
});

const validationObjProp = PropTypes.oneOfType([
  PropTypes.bool,
  validatorProp,
  validationStandardShape,
]);

export const validationProp = PropTypes.objectOf(validationObjProp);
