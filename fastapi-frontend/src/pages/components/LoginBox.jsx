import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from "./components.module.css";
import { useState } from 'react';
import AuthService from '../../services/auth.service';
import { useRouter } from 'next/router';

const LoginBox = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const boxStyle = {
    width: '4in',
    height: '3in',
    border: '1px solid #ccc',
    padding: '40px',
    borderRadius: '8px',
    margin: 'auto',
    backgroundColor: 'rgba(3, 187, 212, 1)',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await AuthService.login(email, password);
      if (resp && resp.access_token) {
        // Login successful
        console.log('Login success');
        router.push('/');
      } else {
        // Login failed
        console.log('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} style={boxStyle}>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className={`mb-3 ${styles.loginPW}`}>
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="mt-2">
              <Button className={styles.loginBtn} variant="primary" type="submit">
                Log In
              </Button>
              <div className="mt-2">
      
                <Button className={styles.registerBtn} variant="secondary" type="button">
                  Create Account
                </Button>
              </div>
              
              <Button className={styles.lostpw} variant="link" onClick={() => router.push('/forgot-password')}>
                Forgot Password
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginBox;
