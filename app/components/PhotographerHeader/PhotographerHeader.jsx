import Image from "next/image";
import styles from "./PhotographerHeader.module.css";

export default function PhotographerHeader({ photographer }) {
  return (
    <header className={styles.photographerHeader}>
      <div>
        <h1>{photographer.name}</h1>
        <p className={styles.location}>
          {photographer.city}, {photographer.country}
        </p>
        <p className={styles.tagline}> {photographer.tagline} </p>
      </div>
      <button type="button" className={styles.contactButton}>
        Contactez-moi
      </button>
      <div className={styles.portraitContainer}>
        <Image
          src={`/${photographer.portrait}`}
          fill={true}
          alt={photographer.name}
        />
      </div>
    </header>
  );
}
