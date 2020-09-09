import React from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import Logo from '../UI/Logo';

export default () => (
  <main>
    <Helmet title="404 Page Not Found" />
    <Jumbotron className="text-center mb-3">
      <Container>
        <p className="lead">
          <Logo />
        </p>
        <h1 className="jumbotron-heading display-4">404 - Not Found</h1>
        <p className="lead">
          Can't find what you're looking
          for? <a href="https://github.com/availity/availity-reactstrap-validation/issues/new">Open</a> up an issue.
        </p>
        <p>
          <Button outline color="danger" className="mr-3" tag={Link} to="/">Get Started</Button>
          <Button color="danger" tag={Link} to="/components/">View Components</Button>
        </p>
      </Container>
    </Jumbotron>
  </main>
);
