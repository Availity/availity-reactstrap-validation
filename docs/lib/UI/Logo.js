import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const Logo = ({ location: { basename }, width }) => (
  <img src={`${basename || ''}/assets/logo.png`} alt="logo" width={width} />
);

Logo.propTypes = {
  location: PropTypes.shape({ basename: PropTypes.string }).isRequired,
  width: PropTypes.string,
};

Logo.defaultProps = {
  width: '150px',
};

export default withRouter(Logo);
