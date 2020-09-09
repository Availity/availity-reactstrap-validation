var jsdom = require('jsdom');
const { JSDOM } = jsdom;
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');
var chaiEnzyme = require('chai-enzyme');
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
var exposedProperties = ['window', 'navigator', 'document'];

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

chai.config.includeStack = true;

global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
global.expect = chai.expect;
global.sinon = sinon;

global.render = enzyme.render;
global.shallow = enzyme.shallow;
global.mount = enzyme.mount;

const { document } = new JSDOM('', { url: 'http://localhost/' }).window;
global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
