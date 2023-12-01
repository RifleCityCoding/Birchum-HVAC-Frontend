import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from "./components.module.css";
import Image from 'next/image';

const Header = () => {
  return (
    <Navbar className={styles.header} expand="lg">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#home" className={styles['brand-logo']}>
          <Image
            src="/logo.png"
            height={80}
            width={100}
            className="d-inline-block align-top"
            alt="Your Logo"
          />
        </Navbar.Brand>

        {/* Navbar Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Collapsible Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" fill>
            {/* Nav Links (Buttons) */}
            <Nav.Link className={styles.navLink} href="#link1">Button 1</Nav.Link>
            <Nav.Link className={styles.navLink} href="#link2">Button 2</Nav.Link>
            <Nav.Link className={styles.navLink} href="#link3">Button 3</Nav.Link>
            <Nav.Link className={styles.navLink} href="#link4">Button 4</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
