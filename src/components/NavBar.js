import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo-192x192.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
            <NavLink exact to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink
                exact
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/">
                <i className="fas fa-home"></i>Home
              </NavLink>
              <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/signin">
                <i className="fas fa-sign-in-alt"></i>Sign In
              </NavLink>
              <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/signup">
                <i className="fas fa-user-plus"></i>Sign Up
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
