import {Component} from 'react';

function validComponent(input) {
  const name = input && input.props ? input.props.name : undefined;

  if (!name) {
    throw new Error(`Input ${input} has no "name" prop`);
  }

  return {name};
}

export default class InputContainer extends Component {
  componentWillMount() {
    this._updaters = {};
    this._inputs = {};
  }

  registerInput(input, updater = input && input.forceUpdate) {
    const {name} = validComponent(input, updater);
    this._updaters[name] = updater;
    this._inputs[name] = input;
  }

  unregisterInput(input) {
    const {name} = validComponent(input);
    delete this._updaters[name];
    delete this._inputs[name];
  }
}
