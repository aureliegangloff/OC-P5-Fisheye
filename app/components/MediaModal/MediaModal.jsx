"use client";
import styles from "./MediaModal.module.css";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function MediaModal({
  sortedMedia,
  selectedMedia,
  setIsModalOpen,
}) {
  // Recherche du media selectionné dans les médias du photographe
  const initialIndex = sortedMedia.findIndex(
    (item) => item.id === selectedMedia.id,
  );

  // Gestion de la navigation entre les médias au clic
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const previousImage = () => {
    setCurrentIndex((index) =>
      index === 0 ? sortedMedia.length - 1 : index - 1,
    );
  };
  const nextImage = () => {
    setCurrentIndex((index) =>
      index === sortedMedia.length - 1 ? 0 : index + 1,
    );
  };

  // Gestion de la navigation au clavier
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setCurrentIndex((index) =>
          index === 0 ? sortedMedia.length - 1 : index - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((index) =>
          index === sortedMedia.length - 1 ? 0 : index + 1,
        );
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sortedMedia.length]);

  // Affichage du média actuel
  const currentMedia = sortedMedia[currentIndex];

  return (
    <Modal
      setIsModalOpen={setIsModalOpen}
      buttonCloseLabel="Close dialog"
      style="light"
    >
      <div className={styles.contentModal} aria-label="image closeup view">
        <button
          type="button"
          className={styles.previousButton}
          onClick={previousImage}
          aria-label="Previous image"
        ></button>
        <div className={styles.mediaItem}>
          {currentMedia.image ? (
            <Image
              src={`/${currentMedia.image}`}
              alt={currentMedia.title}
              width={1050}
              height={900}
            />
          ) : (
            <video
              src={`/${currentMedia.video}`}
              aria-label={currentMedia.title}
              width={1050}
              height={900}
              controls
              autoPlay
              muted
              loop
            ></video>
          )}

          <legend className={styles.mediaTitle}>{currentMedia.title}</legend>
        </div>
        <button
          type="button"
          className={styles.nextButton}
          onClick={nextImage}
          aria-label="Next image"
        ></button>
      </div>
    </Modal>
  );
}
