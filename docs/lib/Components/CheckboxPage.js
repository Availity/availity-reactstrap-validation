/* eslint import/first: 0, import/newline-after-import: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';

import CheckboxExample from '../examples/Checkbox';
const CheckboxExampleSource = require('!!raw-loader!../examples/Checkbox.js');
import CheckboxTrueValueExample from '../examples/CheckboxTrueValue';
const CheckboxTrueValueExampleSource = require('!!raw-loader!../examples/CheckboxTrueValue.js');
import CheckboxFalseValueExample from '../examples/CheckboxFalseValue';
const CheckboxFalseValueExampleSource = require('!!raw-loader!../examples/CheckboxFalseValue.js');
import CheckboxDefaultExample from '../examples/CheckboxDefault';
const CheckboxDefaultExampleSource = require('!!raw-loader!../examples/CheckboxDefault.js');

export default () => (
  <div>
    <Helmet title="Checkboxes" />
    <h3>Checkboxes</h3>
    <p>
      Checkboxes are slightly special as the user cannot define a value, but only check and uncheck the box.
      There are special props, <code>trueValue</code> and <code>falseValue</code> which allow you to determine what
      the value returned will be when the box is check or not checked respectfully. <code>trueValue</code> will
      default to <code>true</code> and <code>falseValue</code> will default to <code>false</code>.
    </p>
    <div className="docs-example">
      <CheckboxExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {CheckboxExampleSource}
      </PrismCode>
    </pre>

    <h4>True Value</h4>
    <p>
      Checking the boxes and submitting the form, you will see the value passed is the <code>trueValue</code> for
      the checkbox; <code>true</code> by default.
    </p>
    <div className="docs-example">
      <CheckboxTrueValueExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {CheckboxTrueValueExampleSource}
      </PrismCode>
    </pre>

    <h4>False Value</h4>
    <p>
      Leaving the boxes unchecked and submitting the form, you will see the value passed is the
      <code>falseValue</code> for the checkbox; <code>false</code> by default.
    </p>
    <div className="docs-example">
      <CheckboxFalseValueExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {CheckboxFalseValueExampleSource}
      </PrismCode>
    </pre>

    <h4>Model Default Values</h4>
    <p>
      Using the model prop on the form, you can indicate if the checkboxes should be checked or unchecked when
      initialized by providing the trueValue or falseValue in the model prop on the form.
    </p>
    <div className="docs-example">
      <CheckboxDefaultExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {CheckboxDefaultExampleSource}
      </PrismCode>
    </pre>
  </div>
);
