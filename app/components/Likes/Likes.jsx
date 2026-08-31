"use client";

import styles from "./Likes.module.css";
import { likeMedia } from "../../action/likeMedia";
import { useState } from "react";

export default function Likes({ media, handleLike }) {
  const handleLikeClick = async () => {
    const newNbLikes = media.likes + 1;

    // Maj immédiate de l'affichage
    handleLike(media.id, newNbLikes);

    try {
      await likeMedia(media.id, newNbLikes);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du like :", error);

      // Retour à la valeur précédente si Prisma échoue
      handleLike(media.id, media.likes);
    }
  };

  return (
    <p className={styles.mediaLikes}>
      {media.likes}{" "}
      <button
        type="button"
        className={styles.heart}
        onClick={handleLikeClick}
        aria-label={`Ajouter un like à ${media.title}`}
      >
        {" "}
        Likes
      </button>
    </p>
  );
}
