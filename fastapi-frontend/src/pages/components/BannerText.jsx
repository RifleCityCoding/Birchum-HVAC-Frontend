import styles from './components.module.css'; 

const BannerText = () => {
//   const bannerStyle = {
//     width: '6in',
//     height: '2in',
//     border: '1px solid #000',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   };

  return (
    <div className={styles.banner}>
      <div className={styles.stackedText}>
      <h2 className={styles.homeText}>QUALITY HVAC SERVICES</h2>
      <h2 className={styles.homeText}>COMPETITIVE LOCAL PRICES</h2>
    </div>
    </div>
  );
};

export default BannerText;