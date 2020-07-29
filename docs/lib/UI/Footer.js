/* eslint jsx-a11y/iframe-has-title: 0 */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default () => (
  <div className="footer">
    <Container fluid>
      <Row>
        <Col className="text-center">
          <p className="social">
            &copy; 2016 - present Availity &nbsp;&nbsp;
            <iframe
              src="https://ghbtns.com/github-btn.html?user=availity&repo=availity-reactstrap-validation&type=star&count=true"
              frameBorder="0"
              scrolling="0"
              width="100"
              height="20px"
            />
            <iframe
              src="https://ghbtns.com/github-btn.html?user=availity&repo=availity-reactstrap-validation&type=fork&count=true"
              frameBorder="0"
              scrolling="0"
              width="100"
              height="20px"
            />
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);
