import {AvStore} from 'availity-reactstrap-validation';


describe.only('AvStore', () => {
  describe('subscribe', () => {
    const spy = sinon.spy();
    let Store;
    beforeEach(() => {
      Store = new AvStore();
      spy.reset();
    });

    it('Should throw errors with invalid name', () => {
      expect(() => Store.subscribe(undefined, spy, {})).to.throw('name is required to register');
      expect(() => Store.subscribe(true, spy, {})).to.throw('name must be a string');
      expect(() => Store.subscribe('.bad.name', spy, {})).to.throw('name cannot start with .');
      const testName = 'test';
      Store.subscribers = { [testName]: true };
      expect(() => Store.subscribe(testName, spy, {})).to.throw('is already subscribed');
    });

    it('Should throw error without subscriber', () => {
      expect(() => Store.subscribe('test', undefined, {})).to.throw('must pass in subscribing function');
      expect(() => Store.subscribe('test', true, {})).to.throw('must pass in subscribing function');
      expect(() => Store.subscribe('test', 'subscriber', {})).to.throw('must pass in subscribing function');
    });

    it('Should store subscriber by name', () => {
      const name = 'test';
      Store.subscribe(name, spy);
      expect(Store.subscribers[name]).to.equal(spy);
    });

    it('Should create defaults for input state', () => {
      const name = 'test';
      Store.subscribe(name, spy);
      expect(Store.inputs[name]).to.eql({
        touched: false,
        dirty: false,
        bad: false,
        valid: true,
        pending: false,
      });
    });

    it('Should merge in provided state', () => {
      const name = 'test';
      const state = {
        touched: true,
        value: 'testValue',
      };
      Store.subscribe(name, spy, {state});
      expect(Store.inputs[name]).to.eql({
        value: 'testValue',
        touched: true,
        dirty: false,
        bad: false,
        valid: true,
        pending: false,
      });
    });

    it('Should accept value option', () => {
      const name = 'test';
      const value = 'helloWorld';
      Store.subscribe(name, spy, {value});
      expect(Store.inputs[name]).to.eql({
        value,
        touched: false,
        dirty: false,
        bad: false,
        valid: true,
        pending: false,
      });
    });

    it('Should return unsuscribe function', () => {
      const name = 'test';
      const unsuscribe = Store.subscribe(name, spy);
      expect(Store.subscribers[name]).to.equal(spy);
      expect(unsuscribe).to.be.a('function');
      unsuscribe();
      expect(Store.subscribers[name]).to.be.undefined;
    });

  });
});
