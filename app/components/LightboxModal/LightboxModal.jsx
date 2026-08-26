"use client";
import styles from "./LightboxModal.module.css";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { useState } from "react";

export default function LightboxModal({
  photographerMedia,
  selectedMedia,
  setIsModalOpen,
}) {
  // Recherche du media selectionné dans les médias du photographe
  const initialIndex = photographerMedia.findIndex(
    (item) => item.id === selectedMedia.id,
  );

  // Index image active
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const previousImage = () => {
    setCurrentIndex((index) =>
      index === 0 ? photographerMedia.length - 1 : index - 1,
    );
  };

  const nextImage = () => {
    setCurrentIndex((index) =>
      index === photographerMedia.length - 1 ? 0 : index + 1,
    );
  };

  const currentMedia = photographerMedia[currentIndex];
  console.log(currentMedia);

  return (
    <Modal
      setIsModalOpen={setIsModalOpen}
      buttonCloseLabel="Close dialog"
      style="light"
      aria-label="image closeup view"
    >
      <button
        type="button"
        className={styles.previousButton}
        onClick={previousImage}
        aria-label="Previous image"
      >
        ←
      </button>
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
          ></video>
        )}

        <legend className={styles.mediaTitle}>{currentMedia.title}</legend>
      </div>
      <button
        type="button"
        className={styles.nextButton}
        onClick={nextImage}
        aria-label="Next image"
      >
        →
      </button>
    </Modal>
  );
}
