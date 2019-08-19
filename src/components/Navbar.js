import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, NavLink as RRNavLink } from 'react-router-dom';
import { logOut } from '../actions/authActions';
import { withFirebase } from '../Firebase/context';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.png';
import {
  Collapse,
  Navbar as Nbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Badge
} from 'reactstrap';
function Navbar({ history, firebase }) {
  const { isAuthenticated, name, remainingAmount, currency } = useSelector(
    state => state.user
  );

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return isAuthenticated ? (
    <Nbar color="dark" dark fixed="top" expand="md">
      <Container fluid className="mx-md-5">
        <NavbarBrand tag={RRNavLink} to="/dashboard">
          {' '}
          <img
            src={logo}
            alt="Logo"
            srcSet=""
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <strong>NORD BANK</strong>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/dashboard">
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/addtransaction"
                className="btn btn-primary text-white"
              >
                Add transaction
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="mr-md-5">
                Current account:{' '}
                <Badge color="light" className="p-2">
                  {`${remainingAmount}  ${currency}`}
                </Badge>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img src={avatar} alt="John wick" srcSet="" /> {name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  onClick={() => {
                    localStorage.removeItem('authUser');
                    firebase.doSignOut();
                    history.push('/');
                    dispatch(logOut());
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Nbar>
  ) : null;
}

export default withRouter(withFirebase(Navbar));
