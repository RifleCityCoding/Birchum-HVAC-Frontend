import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./components.module.css";

const Footer = () => {
  return (
    <footer className="footer">
      
        <Row className={styles.footer}>
          <Col xs={12} md={3}>
            <h5 className={styles.footer_h5} >Section 1</h5>
            <p>Some text here...</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className={styles.footer_h5} >Section 2</h5>
            <p>Some text here...</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className={styles.footer_h5} >Section 3</h5>
            <p>Some text here...</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className={styles.footer_h5} >Section 4</h5>
            <p>Some text here...</p>
          </Col>
        </Row>
     
    </footer>
  );
};

export default Footer;
