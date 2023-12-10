import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./components.module.css";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <Row className={styles.footer}>
        <Col xs={12} md={3} className={styles.column}>
          <div className={styles.columnContent}>
            <h5 className={styles.footer_h5}>
              Bootcamp hosted by{" "}
              <a href="https://www.awesomeinc.org" target="_blank" rel="noopener noreferrer">
                Awesome INC
              </a>
            </h5>
            <p></p>
          </div>
        </Col>
        <Col xs={12} md={3} className={styles.column}>
          <div className={styles.columnContent}>
            <h5 className={styles.footer_h5}>Project by:</h5>
            <strong>James Spencer</strong>
          </div>
        </Col>
        <Col xs={12} md={3} className={styles.column}>
          <div className={styles.columnContent}>
            <h5 className={styles.footer_h5}>Contact Me</h5>
            <a href='https://github.com/RifleCityCoding' target='blank' rel='noopener noreferrer'>Github</a>
            <a href='https://www.linkedin.com/in/james-spencer-dev/' target='blank' rel='noopener norefferer'>LinkedIn</a>
          </div>
        </Col>
        <Col xs={12} md={3} className={styles.column}>
          <div className={styles.columnContent}>
            <h5 className={styles.footer_h5}>In memory of</h5>
            <p>Doretta Birchum</p>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;