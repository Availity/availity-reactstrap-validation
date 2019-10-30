import { AvInputContainer } from 'availity-reactstrap-validation';

describe('BaseInput', function() {
  beforeEach(() => {
    this.inputs = {};
    this.updaters = {};
    this.component = new AvInputContainer();
    this.component._inputs = this.inputs;
    this.component._updaters = this.inputs;
  });

  describe('component will mount', () => {
    it('should get the default value', () => {
      this.component.UNSAFE_componentWillMount();
      expect(this.component._inputs).to.eql({});
    });
  });

  describe('register input', () => {
    it('should throw if the input does not have name', () => {
      expect(
        this.component.registerInput.bind(this.component, {
          props: { type: 'text' },
        })
      ).to.throw('no "name" prop');
    });

    it('should throw if the input does not have props', () => {
      expect(this.component.registerInput.bind(this.component, {})).to.throw(
        'no "name" prop'
      );
    });

    it('should throw if the input is undefined', () => {
      expect(this.component.registerInput.bind(this.component)).to.throw(
        'no "name" prop'
      );
    });

    describe('other input types', () => {
      it('should add the input to the inputs object', () => {
        const input = { props: { name: 'name', type: 'text' } };
        this.component.registerInput(input);
        expect(this.inputs[input.props.name]).to.equal(input);
      });
    });
  });

  describe('unregister input', () => {
    it('should throw if the input does not have name', () => {
      expect(
        this.component.unregisterInput.bind(this.component, {
          props: { type: 'text' },
        })
      ).to.throw('no "name" prop');
    });

    describe('other input types', () => {
      it('should remove the input to the inputs object', () => {
        const input = { props: { name: 'name', type: 'text' } };
        this.inputs[input.props.name] = input;
        this.component.unregisterInput(input);
        expect(this.inputs[input.props.name]).to.not.exist;
      });

      it('should not care that the input is not registered', () => {
        const input = { props: { name: 'name', type: 'text' } };
        delete this.inputs[input.props.name];
        this.component.unregisterInput(input);
        expect(this.inputs[input.props.name]).to.not.exist;
      });
    });
  });
});
