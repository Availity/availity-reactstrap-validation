import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';

const AvFeedback = (props, context) => {
  const validation = context.Group.getInputState();
  return <FormFeedback valid={!validation.error} {...props} />;
};

AvFeedback.propTypes = { ...FormFeedback.propTypes };

AvFeedback.contextTypes = {
  FormCtrl: PropTypes.object.isRequired,
  Group: PropTypes.object.isRequired,
};

export default AvFeedback;
