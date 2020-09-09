import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  NavbarToggler,
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavbar = e => {
    e.preventDefault();
    setShowNavbar(!showNavbar);
  };

  return (
    <Navbar className="header" color="faded" light expand="md">
      <Container>
        <NavbarBrand className="mr-auto" tag={Link} to="/">
          Availity reactstrap Validation
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse navbar isOpen={showNavbar}>
          <Nav navbar className="ml-sm-auto">
            <NavItem>
              <NavLink tag={Link} to="/components/" activeClassName="active">
                Components
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/availity/availity-reactstrap-validation">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
