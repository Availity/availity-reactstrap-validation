/* eslint import/first: 0, import/newline-after-import: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';

import ValidationCustomMessageExample from '../examples/ValidationCustomMessage';
const ValidationCustomMessageExampleSource = require('!!raw-loader!../examples/ValidationCustomMessage.js');
import ValidationDateExample from '../examples/ValidationDate';
const ValidationDateExampleSource = require('!!raw-loader!../examples/ValidationDate.js');
import ValidationDateRangeExample from '../examples/ValidationDateRange';
const ValidationDateRangeExampleSource = require('!!raw-loader!../examples/ValidationDateRange.js');
import ValidationDateTimeExample from '../examples/ValidationDateTime';
const ValidationDateTimeExampleSource = require('!!raw-loader!../examples/ValidationDateTime.js');
import ValidationEmailExample from '../examples/ValidationEmail';
const ValidationEmailExampleSource = require('!!raw-loader!../examples/ValidationEmail.js');
import ValidationMatchExample from '../examples/ValidationMatch';
const ValidationMatchExampleSource = require('!!raw-loader!../examples/ValidationMatch.js');
import ValidationMaxExample from '../examples/ValidationMax';
const ValidationMaxExampleSource = require('!!raw-loader!../examples/ValidationMax.js');
import ValidationMaxLengthExample from '../examples/ValidationMaxLength';
const ValidationMaxLengthExampleSource = require('!!raw-loader!../examples/ValidationMaxLength.js');
import ValidationMaxCheckedExample from '../examples/ValidationMaxChecked';
const ValidationMaxCheckedExampleSource = require('!!raw-loader!../examples/ValidationMaxChecked.js');
import ValidationMinExample from '../examples/ValidationMin';
const ValidationMinExampleSource = require('!!raw-loader!../examples/ValidationMin.js');
import ValidationMinLengthExample from '../examples/ValidationMinLength';
const ValidationMinLengthExampleSource = require('!!raw-loader!../examples/ValidationMinLength.js');
import ValidationMinCheckedExample from '../examples/ValidationMinChecked';
const ValidationMinCheckedExampleSource = require('!!raw-loader!../examples/ValidationMinChecked.js');
import ValidationNpiExample from '../examples/ValidationNpi';
const ValidationNpiExampleSource = require('!!raw-loader!../examples/ValidationNpi.js');
import ValidationNumberExample from '../examples/ValidationNumber';
const ValidationNumberExampleSource = require('!!raw-loader!../examples/ValidationNumber.js');
import ValidationPatternExample from '../examples/ValidationPattern';
const ValidationPatternExampleSource = require('!!raw-loader!../examples/ValidationPattern.js');
import ValidationPhoneExample from '../examples/ValidationPhone';
const ValidationPhoneExampleSource = require('!!raw-loader!../examples/ValidationPhone.js');
import ValidationRequiredExample from '../examples/ValidationRequired';
const ValidationRequiredExampleSource = require('!!raw-loader!../examples/ValidationRequired.js');
import ValidationStepExample from '../examples/ValidationStep';
const ValidationStepExampleSource = require('!!raw-loader!../examples/ValidationStep.js');
import ValidationAsyncExample from '../examples/ValidationAsync';
const ValidationAsyncExampleSource = require('!!raw-loader!../examples/ValidationAsync.js');

export default () => (
  <div>
    <Helmet title="Validators" />
    <h3>Validations</h3>
    <hr />
    <h4>Custom error messages</h4>
    <div className="docs-example">
      <ValidationCustomMessageExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationCustomMessageExampleSource}
      </PrismCode>
    </pre>

    <h4>Date</h4>
    <div className="docs-example">
      <ValidationDateExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationDateExampleSource}
      </PrismCode>
    </pre>

    <h4>DateRange</h4>
    <div className="docs-example">
      <ValidationDateRangeExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationDateRangeExampleSource}
      </PrismCode>
    </pre>

    <h4>DateTime</h4>
    <div className="docs-example">
      <ValidationDateTimeExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationDateTimeExampleSource}
      </PrismCode>
    </pre>

    <h4>Email</h4>
    <div className="docs-example">
      <ValidationEmailExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationEmailExampleSource}
      </PrismCode>
    </pre>

    <h4>Match</h4>
    <div className="docs-example">
      <ValidationMatchExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationMatchExampleSource}
      </PrismCode>
    </pre>

    <h4>Max</h4>
    <div className="docs-example">
      <ValidationMaxExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationMaxExampleSource}
      </PrismCode>
    </pre>

    <h4>MaxLength</h4>
    <div className="docs-example">
      <ValidationMaxLengthExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationMaxLengthExampleSource}
      </PrismCode>
    </pre>

    <h4>MaxChecked</h4>
    <div className="docs-example">
      <ValidationMaxCheckedExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationMaxCheckedExampleSource}
      </PrismCode>
    </pre>

    <h4>Min</h4>
    <div className="docs-example">
      <ValidationMinExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationMinExampleSource}
      </PrismCode>
    </pre>

    <h4>MinLength</h4>
    <div className="docs-example">
      <ValidationMinLengthExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationMinLengthExampleSource}
      </PrismCode>
    </pre>

    <h4>MinChecked</h4>
    <div className="docs-example">
      <ValidationMinCheckedExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationMinCheckedExampleSource}
      </PrismCode>
    </pre>

    <h4>Npi</h4>
    <div className="docs-example">
      <ValidationNpiExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationNpiExampleSource}
      </PrismCode>
    </pre>

    <h4>Number</h4>
    <div className="docs-example">
      <ValidationNumberExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationNumberExampleSource}
      </PrismCode>
    </pre>

    <h4>Pattern</h4>
    <div className="docs-example">
      <ValidationPatternExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationPatternExampleSource}
      </PrismCode>
    </pre>

    <h4>Phone</h4>
    <p>Note: Validates against NANP</p>
    <div className="docs-example">
      <ValidationPhoneExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationPhoneExampleSource}
      </PrismCode>
    </pre>

    <h4>Required</h4>
    <div className="docs-example">
      <ValidationRequiredExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationRequiredExampleSource}
      </PrismCode>
    </pre>

    <h4>Step</h4>
    <p>Note: Only works only with input type of numbers</p>
    <div className="docs-example">
      <ValidationStepExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationStepExampleSource}
      </PrismCode>
    </pre>

    <h4>Custom / Async</h4>
    <div className="docs-example">
      <ValidationAsyncExample />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {ValidationAsyncExampleSource}
      </PrismCode>
    </pre>
  </div>
);
