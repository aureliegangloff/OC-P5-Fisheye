"use client";
import styles from "./PhotographerGallery.module.css";
import Image from "next/image";
import Modal from "../Modal/Modal";
import Carrousel from "../Carrousel/Carrousel";
import Likes from "../Likes/Likes";
import { useState, useEffect } from "react";

export default function PhotographerGallery({ sortedMedia, handleLike }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gestion de la modale
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
        {sortedMedia.map((media) => (
          <figure key={media.id} className={styles.mediaItem}>
            <button
              type="button"
              onClick={() => handleMediaClick(media)}
              aria-label={media.title}
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
            </button>

            <figcaption>
              <p className={styles.mediaTitle}>{media.title}</p>
              <Likes media={media} handleLike={handleLike}></Likes>
            </figcaption>
          </figure>
        ))}
      </section>

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          buttonCloseLabel="Close dialog"
          style="light"
        >
          <div className={styles.contentModal} aria-label="image closeup view">
            <Carrousel
              sortedMedia={sortedMedia}
              selectedMedia={selectedMedia}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
