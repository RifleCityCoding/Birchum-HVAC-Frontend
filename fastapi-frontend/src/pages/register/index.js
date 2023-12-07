import Footer from "../components/MainFooter";
import Header from "../components/MainHeader";
import RegisterPage from "../components/RegisterUser";
import { Josefin_Sans } from 'next/font/google'
import styles from "../components/components.module.css";

const josefin = Josefin_Sans({
  weight: '400',
  subsets: ['latin']
})

export default function Register () {


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
              gridRow: "1",
              gridColumn: "1",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: "2",
              gridRow: "1",
              gridColumn: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                gridColumn: "2"
              }}
            >
              <RegisterPage />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}