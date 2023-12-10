import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import styles from "./components.module.css";
import Image from "next/image";
import authService from "@/services/auth.service";
import React, { useState, useEffect } from 'react'
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = jwtDecode(userData);
        console.log('User data:', user);
        dispatch({
          type: 'SET_USER',
          payload: user,
        });
        setIsLoggedIn(true); // Set login status to true when user data is found
      } else {
        setIsLoggedIn(false); // Set login status to false if no user data is found
      }
    };
    getUserFromLocalStorage();
  }, [dispatch]);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    setIsLoggedIn(false);
    router.push('/');
  };
  
  return (
    <Navbar className={styles.header} expand="xxl">
      <Navbar.Brand href="/" className={`mr-0 ${styles.brand}`}>
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
        <Nav className={`ml-auto`} fill>
          <Nav.Link className={styles.navLink} href="/Calendar">
            Schedule
          </Nav.Link>
          <Nav.Link className={styles.navLink} href="/Contact">
            Contact
          </Nav.Link>
          <Nav.Link className={styles.navLink} href="/About">
            About Us
          </Nav.Link>
          {state.user ? (
            <NavDropdown
              id="basic-nav-dropdown"
              className={styles.customDropdownToggle}
              title={<span style={{ color: 'white' }}>Account</span>}
            >
              <NavDropdown.Item href="/Account">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Receipts(TBD)</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (<></>)}
        </Nav>
      </Navbar.Collapse>
      <div className={styles["emergency-container"]}>
        <h1 className={styles.emergency}>Emergency Services</h1>
        <h3 className={styles.emergency}>(800)555-0123</h3>
      </div>
    </Navbar>
  );
};

export default Header;