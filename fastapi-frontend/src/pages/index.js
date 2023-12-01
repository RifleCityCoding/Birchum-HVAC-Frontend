import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/MainHeader"
import styles from "./components/components.module.css";
import { Josefin_Sans } from 'next/font/google'


const josefin = Josefin_Sans({
  weight: '400',
  subsets: ['latin']
  
})

export default function Home() {

  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = jwtDecode(userData);
        console.log('User data:', user);
        dispatch({
          type: 'SET_USER',
          payload: user
        });
      }
    };
    getUserFromLocalStorage();
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    router.push('/');
  };

  return (
    <main  className={josefin.className}>
            <Header />
              
          
      <div
      style={{
      backgroundImage: `url("./HVACBackground.jpeg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      width: "100vw",
      height: "100vh",
    }}
  >
    {/* Rest of content */}
    <div>
      <h3>Text</h3>
    </div>
  </div>
      

        {/* <div className={styles.grid}>
        {state.user ? (
            <li className="nav-item">
              <Link href="/" className={styles.logout} onClick={handleLogout}>Logout</Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link href="/login">Login</Link>
            </li>
          )}
        </div> */}

    </main>
  )
}
