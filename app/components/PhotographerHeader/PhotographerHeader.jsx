import Image from "next/image";
import styles from "./PhotographerHeader.module.css";
import ContactButton from "../ContactButton/ContactButton.jsx";

export default function PhotographerHeader({ photographer }) {
  return (
    <header className={styles.photographerHeader}>
      <div>
        <h1 className={styles.headerTitle}>{photographer.name}</h1>
        <p className={styles.location}>
          {photographer.city}, {photographer.country}
        </p>
        <p className={styles.tagline}> {photographer.tagline} </p>
      </div>

      <ContactButton photographer={photographer}>Contactez-moi</ContactButton>

      <Image
        src={`/${photographer.portrait}`}
        width={200}
        height={200}
        alt={photographer.name}
        loading="eager"
      />
    </header>
  );
}
