import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "./../store/reducers/actions";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const logoutAction = (e) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.LOGOUT_USER,
    });
  };
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Student Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/major">
                Major
              </Nav.Link>
              <Nav.Link as={Link} to="/student">
                Student
              </Nav.Link>
              <Nav.Link as={Link} to="/instructor">
                Instructor
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/home">
                Wellcome to <strong>{userInfo.fullName}</strong>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logoutAction}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
