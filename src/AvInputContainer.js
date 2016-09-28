import { Component } from 'react';

function validComponent(input) {
  const type = input && input.props ? input.props.type : undefined;
  const name = input && input.props ? input.props.name : undefined;

  if (!name) {
    throw new Error('Input ' + input + ' has no "name" prop');
  }

  return {type, name};
}

export default class InputContainer extends Component {
  componentWillMount() {
    this._inputs = {};
  }

  registerInput(input) {
    const {type, name} = validComponent(input);

    if (type === 'radio') {
      this._inputs[name] = this._inputs[name] || [];
      if (this._inputs[name].indexOf(input) < 0) {
        this._inputs[name].push(input);
      }
    } else {
      this._inputs[name] = input;
    }
  }

  unregisterInput(input) {
    const {type, name} = validComponent(input);

    if (type === 'radio') {
      this._inputs[name] = this._inputs[name].filter(ipt => {
        return ipt !== input;
      });
    } else {
      delete this._inputs[name];
    }
  }
}
