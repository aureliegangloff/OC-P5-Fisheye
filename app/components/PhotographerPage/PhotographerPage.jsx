"use client";
import styles from "./PhotographerPage.module.css";

import Header from "../Header/Header";
import ContactButton from "../ContactButton/ContactButton";
import Image from "next/image";

import Filter from "../Filter/Filter";
import PhotographerGallery from "../PhotographerGallery/PhotographerGallery";

import { useState, useEffect } from "react";
import ContactModal from "../ContactModal/ContactModal";

export default function PhotographerProfile({
  photographer,
  photographerMedia,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="container" aria-hidden={isModalOpen}>
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
                setIsModalOpen={setIsModalOpen}
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
              <Filter filter="popularity"></Filter>
              <PhotographerGallery
                photographerMedia={photographerMedia}
              ></PhotographerGallery>
            </main>
          </section>
        </main>
      </div>

      {isModalOpen && (
        <ContactModal
          photographer={photographer}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
