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
  // Ouverture et fermeture de la modale de contact
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isContactModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactModalOpen]);

  // Mise à jour immédiate du média "liké"
  const [medias, setMedias] = useState(photographerMedias); // récupération de la liste de média actuelle
  const handleLike = (mediaId, newNbLikes) => {
    setMedias((previousMedias) =>
      previousMedias.map((media) =>
        media.id === mediaId ? { ...media, likes: newNbLikes } : media,
      ),
    );
  };

  // Filtrage des médias en fonction du filtre sélectionné
  const [selectedFilter, setSelectedFilter] = useState("popularity");
  const sortedMedia = useMemo(() => {
    const sorted = [...medias]; //copie de la liste des medias

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
