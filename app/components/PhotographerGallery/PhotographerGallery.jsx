"use client";
import styles from "./PhotographerGallery.module.css";
import Image from "next/image";
import MediaModal from "../MediaModal/MediaModal";
import { useState, useEffect } from "react";

export default function PhotographerGallery({ photographerMedia }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <section className={styles.photographerGallery}>
        {photographerMedia.map((media) => (
          <button
            type="button"
            key={media.id}
            className={styles.mediaItem}
            onClick={() => handleMediaClick(media)}
          >
            <figure>
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
                  aria-label={media.title}
                  width={350}
                  height={300}
                ></video>
              )}

              <figcaption>
                <p className={styles.mediaTitle}>{media.title}</p>
                <p className={styles.mediaLikes}>
                  {media.likes}{" "}
                  <span className={styles.heart}>Like inactif</span>
                </p>
              </figcaption>
            </figure>
          </button>
        ))}
      </section>

      {isModalOpen && (
        <MediaModal
          photographerMedia={photographerMedia}
          selectedMedia={selectedMedia}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
