import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';

export default class AvFeedback extends Component {
  static propTypes = Object.assign({}, FormFeedback.propTypes);

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
    Group: PropTypes.object.isRequired,
  };

  render() {
    const validation = this.context.Group.getInputState();
    return <FormFeedback valid={!validation.error} {...this.props} />;
  }
}
