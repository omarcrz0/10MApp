import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Timed10MWalkTestApp</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Patient
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/PatientRecord'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Patient Logs
                </NavItem>
            </LinkContainer>
            <LinkContainer to={'/Timed10Form'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Timed 10 Meter Test Form
              </NavItem>
            </LinkContainer>
 

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
