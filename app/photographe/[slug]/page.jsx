import { getPhotographer, getAllPhotographers } from "../../lib/prisma-db";
import Header from "../../components/Header/Header.jsx";
import PhotographerHeader from "../../components/PhotographerHeader/PhotographerHeader.jsx";
import PhotographerGallery from "../../components/PhotographerGallery/PhotographerGallery.jsx";
import Filter from "../../components/Filter/Filter";

export default async function Home({ params }) {
  const { slug } = await params;
  const photographer = await getPhotographer(Number(slug));

  if (!photographer) {
    return <p>Photographe introuvable</p>;
  }

  return (
    <div className="container">
      <Header></Header>
      <main role="main">
        <section role="region" aria-label={`Page de ${photographer.name}`}>
          <PhotographerHeader photographer={photographer}></PhotographerHeader>
          <main>
            <Filter filter="popularity"></Filter>
            <PhotographerGallery
              photographerId={photographer.id}
            ></PhotographerGallery>
          </main>
        </section>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const photographers = await getAllPhotographers();

  return photographers.map((photographer) => ({
    slug: photographer.id.toString(),
  }));
}
