/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";
import Header from "./components/Header/Header.jsx";
import Link from "next/link";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <div className="container">
      <Header page="home"></Header>
      <main role="main">
        <div className={styles.grid}>
          {photographers.map((photographer) => (
            <div className={styles.card} key={photographer.id}>
              <Link
                aria-label={photographer.name}
                href={`/photographe/${photographer.id}`}
              >
                <img
                  src={photographer.portrait}
                  alt=""
                  width="200"
                  height="200"
                />
                <h2 className={styles.cardTitle}>{photographer.name}</h2>
              </Link>
              <p className={styles.cardLocation}>
                {photographer.city}, {photographer.country}
              </p>
              <p className={styles.cardTagline}> {photographer.tagline} </p>
              <p className={styles.cardPrice}> {photographer.price}€/jour </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
