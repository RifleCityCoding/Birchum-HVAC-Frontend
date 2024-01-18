import React, { useState, useEffect } from 'react';
import { useGlobalState } from '@/context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/MainHeader';
import styles from '../components/components.module.css';
import { Josefin_Sans } from 'next/font/google';
import Footer from '../components/MainFooter';
import MyCalendar from '../components/MyCalendar';

const josefin = Josefin_Sans({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const { state, dispatch } = useGlobalState();
  const router = useRouter();

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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 240px)',
          }}
        >
          <div style={{ 
            width: '80%', 
            border: '1px solid #ccc', 
            padding: '20px' }}>
            <MyCalendar />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
