import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { AvForm } from 'availity-reactstrap-validation';
import MobxFormComponent from './MobxFormComponent';

export class Pokemon {
  constructor(json) {
    const _json = json || {};

    extendObservable(this, { name: _json.name || ''});
    extendObservable(this, { rank: _json.rank || ''});
    extendObservable(this, { type: _json.type || ''});
  }
}

let pokemon;
class MobxForm extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    pokemon = new Pokemon();
  }

  render() {
    return (
      <AvForm>
        <MobxFormComponent pokemon={pokemon} />
      </AvForm>
    );
  }
}

export default observer(MobxForm);
