import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Card({ photographer }) {
  return (
    <article className={styles.card}>
      <Link
        aria-label={photographer.name}
        href={`/photographe/${photographer.id}`}
      >
        <div className={styles.portraitContainer}>
          <Image src={`/${photographer.portrait}`} fill={true} alt="" />
        </div>
        <h2 className={styles.cardTitle}>{photographer.name}</h2>
      </Link>
      <p className={styles.cardLocation}>
        {photographer.city}, {photographer.country}
      </p>
      <p className={styles.cardTagline}> {photographer.tagline} </p>
      <p className={styles.cardPrice}> {photographer.price}€/jour </p>
    </article>
  );
}
