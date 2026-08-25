import PhotographerPage from "../../components/PhotographerPage/PhotographerPage";
import {
  getPhotographer,
  getAllPhotographers,
  getAllMediasForPhotographer,
} from "../../lib/prisma-db";

export default async function Home({ params }) {
  const { slug } = await params;
  const photographer = await getPhotographer(Number(slug));

  const photographerMedia = await getAllMediasForPhotographer(
    Number(photographer.id),
  );

  if (!photographer) {
    return <p>Photographe introuvable</p>;
  }

  return (
    <PhotographerPage
      photographer={photographer}
      photographerMedia={photographerMedia}
    />
  );
}

export async function generateStaticParams() {
  const photographers = await getAllPhotographers();

  return photographers.map((photographer) => ({
    slug: photographer.id.toString(),
  }));
}
