import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "./../store/reducers/actions";
import i18n from "./../i18n";
import { useTranslation } from "react-i18next";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState("");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setFlag(localStorage.getItem("lang") === "en" ? "vn" : "us");
  }, []);
  const changeLanguage = (e) => {
    e.preventDefault();
    let lang = localStorage.getItem("lang");
    lang = lang === "en" ? "vi" : "en";
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    setFlag(lang === "en" ? "vn" : "us");
  };

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
            <Nav>
              <Nav.Link onClick={changeLanguage}>
                <i className={`flag-icon flag-icon-${flag}`}></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
