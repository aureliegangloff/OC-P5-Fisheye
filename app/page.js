import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <div className={styles.page}>
      {photographers.map((photographer) => (
        <div key={photographer.id}>
          <h2>{photographer.name}</h2>
          <p>
            {photographer.city}, {photographer.country}
          </p>
        </div>
      ))}
    </div>
  );
}
