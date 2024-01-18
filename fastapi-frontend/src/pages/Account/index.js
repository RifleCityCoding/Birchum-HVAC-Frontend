import React, { useState, useEffect } from 'react'
import { useGlobalState } from '@/context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../components/MainHeader';
import styles from "../components/components.module.css";
import { Josefin_Sans } from 'next/font/google'
import Footer from '../components/MainFooter';
import BannerText from '../components/BannerText';
import LoginPage from '../components/LoginBoxv2';
import UserProfileForm from '../components/AccountInfo';


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
  }, [dispatch]);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    router.push('/');
  };

  return (
    <main className={josefin.className}>
    <div className={styles.main}>
    <Header />
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div
        style={{
          backgroundImage: `url("./HVACBackground.jpeg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "0",
          gridRow: "1", /* Span entire row */
          gridColumn: "1", /* First column */
        }}
      ></div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "1",
          gridRow: "1",
          gridColumn: "1",
        }}
      ><UserProfileForm /></div>
      
    </div>
    <Footer />
    </div>
  </main>
  

  )
}
