import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from "./components.module.css";

const LoginBox = () => {
    const boxStyle = {
      width: '4in',
      height: '3in',
      border: '1px solid #ccc',
      padding: '40px',
      borderRadius: '8px',
      margin: 'auto',
      backgroundColor: 'rgba(3, 187, 212, 1)', // White color with 75% opacity
    };
  
    return (
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} style={boxStyle}>
              <Form>
                {/* Form fields with spacing */}
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
    
                {/* Stacking buttons vertically with spacing */}
                <div className="mt-2">
                  <Button className={styles.loginBtn} variant="primary" type="submit">
                    Log In
                  </Button>
                  <div className="mt-2">
                    <Button className={styles.loginBtn} variant="secondary" type="submit">
                      Create Account
                    </Button>
                  </div>
                  <Button className={styles.lostpw} variant="link">
                    Forgot Password?
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    };
    
    export default LoginBox;