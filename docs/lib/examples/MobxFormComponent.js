import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mobx from 'mobx';
import { observer } from 'mobx-react';
import { AvField, AvGroup, AvInput, AvFeedback, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';
import { Pokemon } from './MobxForm';

export class MobxFormComponent extends Component {
  constructor(props) {
    super(props);

    this.updateProperty = ::this.updateProperty;
  }

  updateProperty(event) {
    const { pokemon } = this.props;
    const { name, value } = event.target;

    pokemon[name] = value;
  }

  render() {
    const { pokemon } = this.props;

    return (
      <div>
        {/* With AvField */}
        <AvField name="name" id="name" label="Name" value={pokemon.name} onChange={this.updateProperty} required />
        {/* With AvGroup AvInput and AvFeedback to build your own */}
        <AvGroup>
          <Label for="example">Rank</Label>
          <AvInput name="rank" id="rank" value={pokemon.rank} onChange={this.updateProperty} required />
          <AvFeedback>This is an error!</AvFeedback>
        </AvGroup>
        {/* Radios */}
        <AvRadioGroup onChange={this.updateProperty} id="type" name="radioExample" label="Radio Buttons!" required errorMessage="Pick one!">
          <AvRadio label="Bulbasaur" value="Bulbasaur" checked={pokemon.type === 'Bulbasaur'} name="type" id="radioOption1" />
          <AvRadio label="Squirtle" value="Squirtle" checked={pokemon.type === 'Squirtle'} name="type" id="radioOption2" />
          <AvRadio label="Charmander" value="Charmander" checked={pokemon.type === 'Charmander'} name="type" id="radioOption3" />
          <AvRadio label="Pikachu" value="Pikachu" checked={pokemon.type === 'Pikachu'} name="type" id="radioOption4" disabled />
        </AvRadioGroup>

        <FormGroup>
          <Button>Submit</Button>
        </FormGroup>
      </div>
    );
  }
}

MobxFormComponent.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    rank: PropTypes.string,
    type: PropTypes.string
  }).isRequired
};

export default observer(MobxFormComponent);
