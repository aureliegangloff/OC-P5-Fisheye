import styles from "./PhotographerGallery.module.css";
import Image from "next/image";

export default function PhotographerGallery({ photographerMedia }) {
  return (
    <section className={styles.photographerGallery}>
      {photographerMedia.map((media) => (
        <div key={media.id} className={styles.mediaItem}>
          {media.image ? (
            <Image
              src={`/${media.image}`}
              alt={media.title}
              width={350}
              height={300}
            />
          ) : (
            <video
              src={`/${media.video}`}
              alt={media.title}
              width={350}
              height={300}
            ></video>
          )}

          <div>
            <p className={styles.mediaTitle}>{media.title}</p>
            <p className={styles.mediaLikes}>
              {media.likes} <span className={styles.heart}>Like inactif</span>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
