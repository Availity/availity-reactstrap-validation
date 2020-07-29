import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

const ComponentLink = ({ item }) => {
  return (
    <NavItem>
      <NavLink tag={Link} to={item.to} activeClassName="active">
        {item.name}
      </NavLink>
    </NavItem>
  );
};

ComponentLink.propTypes = {
  item: PropTypes.shape({
    to: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

class Components extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: [
        {
          name: 'AvForm',
          to: '/components/avform/',
        },
        {
          name: 'Validators',
          to: '/components/validators/',
        },
        {
          name: 'Checkboxes',
          to: '/components/checkboxes/',
        },
      ],
    };
  }

  render() {
    return (
      <Container className="content">
        <Row>
          <Col md={{ size: 3, order: 2 }}>
            <div className="docs-sidebar mb-3">
              <h5>Components</h5>
              <Nav className="flex-column">
                {this.state.navItems.map((item, i) => (
                  <ComponentLink key={i} item={item} />
                ))}
              </Nav>
            </div>
          </Col>
          <Col md={{ size: 9, order: 1}}>
            {this.props.children}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Components;
