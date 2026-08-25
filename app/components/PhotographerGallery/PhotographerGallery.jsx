"use client";
import styles from "./PhotographerGallery.module.css";
import Image from "next/image";
import LightboxModal from "../LightboxModal/LightboxModal";
import { useState } from "react";

export default function PhotographerGallery({ photographerMedia }) {
  const [isLightboxModalOpen, setIsLightboxModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (media) => {
    setSelectedMedia(media.id);
    setIsLightboxModalOpen(true);
  };

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

            <div>
              <p className={styles.mediaTitle}>{media.title}</p>
              <p className={styles.mediaLikes}>
                {media.likes} <span className={styles.heart}>Like inactif</span>
              </p>
            </div>
          </button>
        ))}
      </section>

      {isLightboxModalOpen && (
        <LightboxModal
          photographerMedia={photographerMedia}
          isLightBoxModalOpen={isLightboxModalOpen}
          setIsLightboxModalOpen={setIsLightboxModalOpen}
          media={selectedMedia}
        />
      )}
    </>
  );
}
