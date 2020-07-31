import { Component } from 'react';

function validComponent(input) {
  const name = input && input.props ? input.props.name : undefined;

  if (!name) {
    throw new Error(`Input ${input} has no "name" prop`);
  }

  return { name };
}

export default class InputContainer extends Component {
  componentWillMount() {
    this._updaters = {};
    this._inputs = {};
  }

  getOldInputName(input) {
    return Object.keys(this._inputs).find(key => this._inputs[key] === input);
  }

  registerInput(input, updater = input && input.setState && input.setState.bind(input)) {
    const { name } = validComponent(input, updater);
    const oldName = this.getOldInputName(input);
    if (oldName !== name) {
      if (oldName) {
        this.unregisterInput({ props: { name: oldName } });
      }
      this._updaters[name] = updater;
      this._inputs[name] = input;
    }
  }

  unregisterInput(input) {
    const { name } = validComponent(input);
    delete this._updaters[name];
    delete this._inputs[name];
  }
}
