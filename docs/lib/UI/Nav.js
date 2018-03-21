import React, { Component } from 'react';
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

export default class UINav extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      showNavbar: false,
    };
  }
  toggleNavbar(e) {
    e.preventDefault();
    this.setState({
      showNavbar: !this.state.showNavbar,
    });
  }
  render() {
    return (
      <Navbar className="header" color="faded" light expand="md">
        <Container>
          <NavbarBrand className="mr-auto" tag={Link} to="/">
            Availity reactstrap Validation
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse navbar isOpen={this.state.showNavbar}>
            <Nav navbar className="ml-sm-auto">
              <NavItem>
                <NavLink
                  tag={Link}
                  className="nav-link"
                  to="/components/"
                  activeClassName="active"
                >
                  Components
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/availity/availity-reactstrap-validation">
                  Github
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
