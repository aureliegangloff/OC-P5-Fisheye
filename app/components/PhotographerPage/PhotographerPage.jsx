"use client";
import styles from "./PhotographerPage.module.css";

import Header from "../Header/Header";
import ContactButton from "../ContactButton/ContactButton";
import Image from "next/image";

import Filter from "../Filter/Filter";
import PhotographerGallery from "../PhotographerGallery/PhotographerGallery";

import TotalLikesAndPrice from "../TotalLikesAndPrice/TotalLikesAndPrice";

import { useState, useEffect, useMemo } from "react";
import ContactModal from "../ContactModal/ContactModal";

export default function PhotographerPage({ photographer, photographerMedias }) {
  /**
   *  Gère l'ouverture et la fermeture de la modale de contact
   * @type {[boolean, function]} isContactModalOpen - État de la modale de contact et fonction pour le mettre à jour
   */
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isContactModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactModalOpen]);

  /**
   * Met à jour le nombre de likes d'un média dans l'état local.
   * @param {number} mediaId - L'identifiant du média à mettre à jour.
   * @param {number} newNbLikes - Le nouveau nombre de likes à attribuer au média.
   */
  const [medias, setMedias] = useState(photographerMedias); // Liste actuelle de médias
  const handleLike = (mediaId, newNbLikes) => {
    setMedias((previousMedias) =>
      previousMedias.map((media) =>
        media.id === mediaId ? { ...media, likes: newNbLikes } : media,
      ),
    );
  };

  /**
   * Trie les médias en fonction du filtre sélectionné.
   * @param {Array} medias - Liste des médias à trier.
   * @param {string} selectedFilter - Filtre sélectionné ("popularity", "date", "title").
   * @returns {Array} - Liste triée des médias.
   */
  const [selectedFilter, setSelectedFilter] = useState("popularity");
  const sortedMedia = useMemo(() => {
    const sorted = [...medias]; //copie de la liste actuelle des medias

    switch (selectedFilter) {
      case "popularity":
        return sorted.sort((a, b) => b.likes - a.likes);
      case "date":
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "title":
        return sorted.sort((a, b) => a.title.localeCompare(b.title, "fr"));
      default:
        return sorted;
    }
  }, [medias, selectedFilter]);

  return (
    <>
      <div className="container" aria-hidden={isContactModalOpen}>
        <Header></Header>
        <main>
          <section aria-label={`Page de ${photographer.name}`}>
            <header className={styles.photographerHeader}>
              <div>
                <h1 className={styles.headerTitle}>{photographer.name}</h1>
                <p className={styles.location}>
                  {photographer.city}, {photographer.country}
                </p>
                <p className={styles.tagline}> {photographer.tagline} </p>
              </div>

              <ContactButton
                photographer={photographer}
                setIsContactModalOpen={setIsContactModalOpen}
              >
                Contactez-moi
              </ContactButton>

              <Image
                src={`/${photographer.portrait}`}
                width={200}
                height={200}
                alt={photographer.name}
                loading="eager"
              />
            </header>
            <div>
              <Filter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              ></Filter>
              <PhotographerGallery
                sortedMedia={sortedMedia}
                handleLike={handleLike}
              ></PhotographerGallery>
              <TotalLikesAndPrice
                medias={medias}
                price={photographer.price}
              ></TotalLikesAndPrice>
            </div>
          </section>
        </main>
      </div>

      {isContactModalOpen && (
        <ContactModal
          photographer={photographer}
          setIsContactModalOpen={setIsContactModalOpen}
        />
      )}
    </>
  );
}
