import React, {Component, PropTypes} from 'react';
import { FormGroup } from 'reactstrap';

export default class AvGroup extends Component {
  static propTypes = Object.assign({}, FormGroup.propTypes);

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Group: React.PropTypes.object.isRequired,
    FormCtrl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {input: {props: {}}};
  }

  getChildContext() {
    this.FormCtrl = {...this.context.FormCtrl};
    const registerValidator = this.FormCtrl.register;
    this.FormCtrl.register = (input) => {
      this.setState({input});
      registerValidator(input);
    };
    return {
      Group: {
        input: this.state.input,
        getInputState: ::this.getInputState,
      },
      FormCtrl: this.FormCtrl,
    };
  }

  getInputState() {
    return this.context.FormCtrl.getInputState(this.state.input.props.name);
  }

  render() {
    const validation = this.getInputState();
    return (
      <FormGroup color={validation.color} {...this.props} />
    );
  }
}
