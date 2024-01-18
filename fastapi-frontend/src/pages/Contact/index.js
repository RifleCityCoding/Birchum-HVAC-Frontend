import React, { useState, useEffect } from "react";
import { useGlobalState } from "@/context/GlobalState";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/MainHeader";
import styles from "../components/components.module.css";
import { Josefin_Sans } from "next/font/google";
import Footer from "../components/MainFooter";
import BannerText from "../components/BannerText";
import LoginPage from "../components/LoginBoxv2";
import ContactForm from "../components/ContactForm";

const josefin = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const { state, dispatch } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = jwtDecode(userData);
        console.log("User data:", user);
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
    };
    getUserFromLocalStorage();
  }, [dispatch]);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT_USER" });
    router.push("/");
  };

  return (
    <main className={josefin.className}>
      <div className={styles.main}>
        <Header />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url("./HVACBackground.jpeg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              maxWidth: "50%",
              padding: "20px",
              position: "absolute",
              left: "0",
              zIndex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "350px",
            }}
          >
            {showContactForm && <ContactForm />}
          </div>
          <div
            style={{
              color: "white",
              textAlign: "center",
              zIndex: "2",
              maxWidth: "50%",
              padding: "20px",
              position: "absolute",
              right: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0px",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            }}
          >
            <h1 style={{ fontSize: "65px" }}>Contact Information</h1>
            <div style={{ fontSize: "30px" }}>
              <p>Phone: +1 234-567-8900</p>
              <p>Email: example@email.com</p>
              <p>Business Hours: Mon-Fri, 9am - 5pm</p>
              <p>
                We provide HVAC services in Lexington, KY and surrounding areas.
              </p>
            </div>
            <div
              onClick={() => setShowContactForm(!showContactForm)}
              className={styles.contactButton}
            >
              Contact Us
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
