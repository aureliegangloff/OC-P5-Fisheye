import Photographer from "../../page/Photographer/Photographer";
import {
  getPhotographer,
  getAllPhotographers,
  getAllMediasForPhotographer,
} from "../../lib/prisma-db";

export default async function PhotographerPage({ params }) {
  const { slug } = await params;
  const photographer = await getPhotographer(Number(slug));

  const photographerMedias = await getAllMediasForPhotographer(
    Number(photographer.id),
  );

  if (!photographer) {
    return <p>Photographe introuvable</p>;
  }

  return (
    <Photographer
      photographer={photographer}
      photographerMedias={photographerMedias}
    />
  );
}

export async function generateStaticParams() {
  const photographers = await getAllPhotographers();

  return photographers.map((photographer) => ({
    slug: photographer.id.toString(),
  }));
}
