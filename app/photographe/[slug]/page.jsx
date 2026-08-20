import styles from "./page.module.css";
import { getPhotographer, getAllPhotographers } from "../../lib/prisma-db";
import Header from "../../components/Header/Header.jsx";

export default async function Home({ params }) {
  const { slug } = await params;
  const photographer = await getPhotographer(Number(slug));

  if (!photographer) {
    return <p>Photographe introuvable</p>;
  }

  return (
    <div className="container">
      <Header></Header>
      <h1>{photographer.name}</h1>
      <p className={styles.cardLocation}>
        {photographer.city}, {photographer.country}
      </p>
      <p className={styles.cardTagline}> {photographer.tagline} </p>
    </div>
  );
}

export async function generateStaticParams() {
  const photographers = await getAllPhotographers();

  return photographers.map((photographer) => ({
    slug: photographer.id.toString(),
  }));
}
