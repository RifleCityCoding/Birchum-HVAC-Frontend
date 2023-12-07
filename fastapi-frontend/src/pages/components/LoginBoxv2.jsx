import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useGlobalState } from '../../context/GlobalState';
import AuthService from '../../services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import styles from "./components.module.css";

const boxStyle = {
  width: '4in',
  height: '3in',
  border: '1px solid #ccc',
  padding: '40px',
  borderRadius: '8px',
  margin: 'auto',
  backgroundColor: 'rgba(3, 187, 212, 1)',
};

function LoginPage() {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const username = email;
    AuthService
      .login(username, password)
      .then(async (resp) => {
        if (resp != undefined) {
          if (resp.access_token) {
            let data = jwtDecode(resp.access_token, { header: true });
            await dispatch({
              type: 'SET_USER',
              payload: data,
            });
            console.log('Login success');
            router.push('/');
          } else {
            console.log('Login failed');
            dispatch({ type: 'LOGOUT_USER' });
          }
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        dispatch({ type: 'LOGOUT_USER' });
      })
      .finally(() => {
        console.log('Login request completed');
      });
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch({ type: 'LOGOUT_USER' });
  };

  return (
    <div>
      {state.user ? (
        <div>
        </div>
      ) : (
        <div className="container" style={boxStyle}>
          <h1>Login</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
                <label htmlFor="email">Email:</label><br />
                <input
                    className="input-field"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="pass">Password:</label><br />
                <input
                    className="input-field"
                    type="password"
                    id="pass"
                    name="password"
                    minLength="8"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <input
                className= {styles.loginBtn}
                type="submit"
                value="Sign in"
            />
        </form>
          <Link href="/register">Register Here</Link>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
