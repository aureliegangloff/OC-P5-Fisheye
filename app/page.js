import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";
import Header from "./components/Header/Header.jsx";
import Card from "./components/Card/Card.jsx";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <div className="container">
      <Header page="home"></Header>
      <main role="main">
        <div className={styles.grid}>
          {photographers.map((photographer) => (
            <Card photographer={photographer} key={photographer.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
