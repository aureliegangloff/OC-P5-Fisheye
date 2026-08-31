"use client";
import styles from "./PhotographerPage.module.css";

import Header from "../Header/Header";
import ContactButton from "../ContactButton/ContactButton";
import Image from "next/image";

import Filter from "../Filter/Filter";
import PhotographerGallery from "../PhotographerGallery/PhotographerGallery";

import { useState, useEffect, useMemo } from "react";
import ContactModal from "../ContactModal/ContactModal";

export default function PhotographerPage({ photographer, photographerMedia }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isContactModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactModalOpen]);

  const [selectedFilter, setSelectedFilter] = useState("popularity");

  const sortedMedia = useMemo(() => {
    const sorted = [...photographerMedia]; //copie de photographerMedia

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
  }, [photographerMedia, selectedFilter]);

  return (
    <>
      <div className="container" aria-hidden={isContactModalOpen}>
        <Header></Header>
        <main role="main">
          <section role="region" aria-label={`Page de ${photographer.name}`}>
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
            <main>
              <Filter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              ></Filter>
              <PhotographerGallery
                sortedMedia={sortedMedia}
              ></PhotographerGallery>
            </main>
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
