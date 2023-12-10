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

const josefin = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function AboutUs() {
  const { state, dispatch } = useGlobalState();

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
  }, []);

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
            display: "grid",
            gridTemplateColumns: "1fr 2px 1fr",
            gap: "0",
            paddingTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "20px",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <img
                src="./JonProfile.jpg"
                alt="Owner 1"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "24px",
                padding: "0 0.25in",
                marginBottom: '60px',
              }}
            >
              <h2>Jon Birchum</h2>
              
                <p>
                  With 15 years of dedicated experience in the HVAC industry,
                  this professional has cultivated a reputation for excellence
                  in delivering top-tier heating, ventilation, and air
                  conditioning solutions. Having contributed expertise to
                  various projects, their journey has been marked by a
                  commitment to precision and customer satisfaction. Their
                  proficiency spans across residential and commercial sectors,
                  reflecting adaptability and a keen understanding of diverse
                  HVAC needs. Embracing advancements in technology, they ensure
                  cutting-edge solutions that prioritize efficiency and comfort
                  in every endeavor. Backed by a decade and a half of expertise,
                  their mission remains steadfast: to provide tailored, reliable
                  HVAC services that redefine comfort and elevate industry
                  standards, ensuring optimal climate control for every space
                  they touch.
                </p>
              
            </div>
          </div>
          {/* Divider */}
          <hr
            style={{
              height: "100%",
              border: "none",
              borderRight: "2px solid black",
              margin: "0",
              borderWidth: "5px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "20px",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <img
                src="./RickProfile.jpg"
                alt="Owner 2"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "24px",
                padding: "0 0.25in", // Padding on both sides
              }}
            >
              <h2>Rick Birchum</h2>
              <p>
                With 42 years of invaluable experience in the HVAC industry,
                this seasoned professional brings unparalleled expertise honed
                through decades of dedicated service, notably at Comfort and
                Process Solutions. Their extensive tenure encompasses a diverse
                range of projects, from residential installations to intricate
                industrial solutions, reflecting a commitment to tailored
                excellence in heating, ventilation, and air conditioning
                services. Their unwavering dedication to quality craftsmanship
                and customer satisfaction remains the hallmark of their
                approach. Embracing technological advancements, they
                continuously integrate innovative solutions to optimize
                performance and energy efficiency, ensuring each project's
                success. Supported by a team of seasoned experts, their legacy
                is defined by a steadfast commitment to reliability, trust, and
                delivering enduring comfort. Their mission persists in
                surpassing industry standards and reshaping comfort experiences,
                epitomizing excellence in every endeavor.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
