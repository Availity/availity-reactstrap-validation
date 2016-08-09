import { AvInputContainer } from 'availity-reactstrap-validation';

describe('BaseInput', function () {
  beforeEach(() => {
    this.inputs = {};
    this.component = new AvInputContainer();
    this.component._inputs = this.inputs;
  });

  describe('component will mount', () => {
    it('should get the default value', () => {
      this.component.componentWillMount();
      expect(this.component._inputs).to.eql({});
    });
  });

  describe('register input', () => {
    it('should throw if the input does not have name', () => {
      expect(this.component.registerInput.bind(this.component,{props: {type: 'text'}})).to.throw('no "name" prop');
    });

    it('should throw if the input does not have props', () => {
      expect(this.component.registerInput.bind(this.component,{})).to.throw('no "name" prop');
    });

    it('should throw if the input is undefined', () => {
      expect(this.component.registerInput.bind(this.component)).to.throw('no "name" prop');
    });

    describe('a radio input type', () => {
      it('it should add a new array if inputs does not have one for the name', () => {
        const input = {props: {name: 'name', type: 'radio'}};
        expect(this.inputs[input.props.name]).to.not.exist;
        this.component.registerInput(input);
        expect(this.inputs[input.props.name]).to.be.a('array').and.eql([input]);
      });

      it('should push to the array if the input is new and the array already exits', () => {
        const input = {props: {name: 'name', type: 'radio'}};
        this.inputs[input.props.name] = [{something: 'already here'}];
        this.component.registerInput(input);
        expect(this.inputs[input.props.name]).to.include(input);
      });

      it('should not add an input to the array which already exists in the array', () => {
        const input = {props: {name: 'name', type: 'radio'}};
        this.inputs[input.props.name] = [input];
        expect(this.inputs[input.props.name]).to.have.a.lengthOf(1).and.include(input);
        this.component.registerInput(input);
        expect(this.inputs[input.props.name]).to.have.a.lengthOf(1).and.include(input);
      });
    });

    describe('other input types', () => {
      it('should add the input to the inputs object', () => {
        const input = {props: {name: 'name', type: 'text'}};
        this.component.registerInput(input);
        expect(this.inputs[input.props.name]).to.equal(input);
      });
    });
  });

  describe('unregister input', () => {
    it('should throw if the input does not have name', () => {
      expect(this.component.unregisterInput.bind(this.component,{props: {type: 'text'}})).to.throw('no "name" prop');
    });

    describe('a radio input type', () => {
      it('should remove the input from the array', () => {
        const input = {props: {name: 'name', type: 'radio'}};
        this.inputs[input.props.name] = [{something: 'already here'}];
        this.component.unregisterInput(input);
        expect(this.inputs[input.props.name]).to.not.include(input);
      });

      it('should not care if the input is not registered', () => {
        const input = {props: {name: 'name', type: 'radio'}};
        this.inputs[input.props.name] = [];
        expect(this.component.unregisterInput.bind(this.component, input)).to.not.throw;
        expect(this.inputs[input.props.name]).to.not.include(input);
      });

      it('should not care if there is no array', () => {
        const input = {props: {name: 'name', type: 'radio'}};
        delete this.inputs[input.props.name];
        expect(this.component.unregisterInput.bind(this.component, input)).to.not.throw;
        expect(this.inputs[input.props.name]).to.not.exist;
      });
    });

    describe('other input types', () => {
      it('should remove the input to the inputs object', () => {
        const input = {props: {name: 'name', type: 'text'}};
        this.inputs[input.props.name] = input;
        this.component.unregisterInput(input);
        expect(this.inputs[input.props.name]).to.not.exist;
      });

      it('should not care that the input is not registered', () => {
        const input = {props: {name: 'name', type: 'text'}};
        delete this.inputs[input.props.name];
        this.component.unregisterInput(input);
        expect(this.inputs[input.props.name]).to.not.exist;
      });
    });
  });
});