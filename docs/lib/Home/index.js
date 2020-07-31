import React from 'react';
import { PrismCode } from 'react-prism';
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router';
import Example from '../examples/import-basic';

const importBasic = require('!!raw!../examples/import-basic.js');

export default () => (
  <div>
    <Jumbotron tag="section" className="jumbotron-header text-center mb-3">
      <Container>
        <Row>
          <Col>
            <p className="lead">
              <img src="/assets/logo.png" alt="logo" width="150px" />
            </p>
            <h1 className="jumbotron-heading display-4">Availity reactstrap Validation</h1>
            <p className="lead">
              Easy to use form validation for <a href="https://github.com/reactstrap/reactstrap">reactstrap</a>
            </p>
            <p>
              <Button outline color="danger" href="https://github.com/availity/availity-reactstrap-validation">
                View on GitHub
              </Button>
              <Button color="danger" tag={Link} to="/components/">View Components</Button>
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm={8}>
          <h2>Installation</h2>
          <hr />
          <h3 className="mt-5">NPM</h3>
          <p>Install reactstrap and peer dependencies via NPM</p>
          <pre>
            <PrismCode className="language-bash">
              npm install --save availity-reactstrap-validation react react-dom
            </PrismCode>
          </pre>
          <p>ES6 - import the components you need</p>
          <div className="docs-example">
            <Example />
          </div>
          <pre>
            <PrismCode className="language-jsx">
              {importBasic}
            </PrismCode>
          </pre>
          <h2 className="mt-5">About the Project</h2>
          <hr />
          <p>
            This library contains helper components that extend the form capabilities provided by reactstrap.
            The library does not depend on jQuery or Bootstrap javascript, only reactstrap.
          </p>
          <p>
            Use the form and input components provided by this library directly instead of the ones provided by
            reactstrap. You can use the components provided by reactstrap in conjunction with the components this
            library provides without an problem, but validation will not work for those particular components.
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);
