import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./components.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <Navbar className={styles.header} expand="lg">
      {/* Logo */}
      <Navbar.Brand href="#home" className={`mr-0 ${styles.brand}`}>
        <Image
          src="/birchumHVAC.png"
          height={130}
          width={200}
          className={styles.logo}
          alt="Your Logo"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse className={styles.navbar} id="basic-navbar-nav">
        <Nav  className={`ml-auto`} fill>
          <Nav.Link className={styles.navLink} href="#link1">
            Schedule
          </Nav.Link>
          <Nav.Link className={styles.navLink} href="#link2">
            Contact
          </Nav.Link>
          <Nav.Link className={styles.navLink} href="/About">
            About Us
          </Nav.Link>
          <Nav.Link className={styles.navLink} href="#link4">
            Account
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
