"use client";
import Header from "../Header/Header";
import PhotographerHeader from "../PhotographerHeader/PhotographerHeader";
import Filter from "../Filter/Filter";
import PhotographerGallery from "../PhotographerGallery/PhotographerGallery";
import { useState, createContext } from "react";

export const ModalContext = createContext();

export default function PhotographerProfile({ photographer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <div className="container" aria-hidden={!isModalOpen}>
        <Header></Header>
        <main role="main">
          <section role="region" aria-label={`Page de ${photographer.name}`}>
            <PhotographerHeader
              photographer={photographer}
            ></PhotographerHeader>
            <main>
              <Filter filter="popularity"></Filter>
              <PhotographerGallery
                photographerId={photographer.id}
              ></PhotographerGallery>
            </main>
          </section>
        </main>
      </div>
    </ModalContext.Provider>
  );
}
