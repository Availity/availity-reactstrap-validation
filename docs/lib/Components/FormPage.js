/* eslint import/first: 0, import/newline-after-import: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';

import FormExample from '../examples/Form';
const FormExampleSource = require('!!raw-loader!../examples/Form.js');
import FormOnSubmitExample from '../examples/FormOnSubmit';
const FormOnSubmitExampleSource = require('!!raw-loader!../examples/FormOnSubmit.js');
import FormOnValidSubmitExample from '../examples/FormOnValidSubmit';
const FormOnValidSubmitExampleSource = require('!!raw-loader!../examples/FormOnValidSubmit.js');
import FormOnInvalidSubmitExample from '../examples/FormOnInvalidSubmit';
const FormOnInvalidSubmitExampleSource = require('!!raw-loader!../examples/FormOnInvalidSubmit.js');
import FormModelExample from '../examples/FormModel';
const FormModelExampleSource = require('!!raw-loader!../examples/FormModel.js');

export default () => (
  <div>
    <Helmet title="Form" />
    <h3>AvForm</h3>
    <p>
      The AvForm component wraps reactstrap's form to add context that the other Av components know about to help share
      validation state
    </p>
    <div className="docs-example">
      <FormExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {FormExampleSource}
      </PrismCode>
    </pre>

    <h4>OnSubmit</h4>
    <p>This callback is called with every submission of the form</p>
    <div className="docs-example">
      <FormOnSubmitExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {FormOnSubmitExampleSource}
      </PrismCode>
    </pre>

    <h4>OnValidSubmit</h4>
    <p>This callback is called only when <strong>every</strong> field is valid when submitted</p>
    <div className="docs-example">
      <FormOnValidSubmitExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {FormOnValidSubmitExampleSource}
      </PrismCode>
    </pre>

    <h4>OnInvalidSubmit</h4>
    <p>This callback is called only when <strong>any</strong> field is invalid when submitted</p>
    <div className="docs-example">
      <FormOnInvalidSubmitExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {FormOnInvalidSubmitExampleSource}
      </PrismCode>
    </pre>

    <h4>Model (Easy default values)</h4>
    <p>
      Pass an object in which the keys correspond to the name props of the form's input to set their initial value.
      Nested objects can be accessed via dot notation. Individual array indexes can be accessed via bracket notation.
      The values object returned to the various submissions handlers will reflex the object shape. Behind the scenes,
      lodash's <a href="https://lodash.com/docs#get">get</a> and <a href="https://lodash.com/docs#set">set</a> are
      being used, look at lodash's documentation to learn more about how to access complex data in the model.
    </p>
    <div className="docs-example">
      <FormModelExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {FormModelExampleSource}
      </PrismCode>
    </pre>
  </div>
);
