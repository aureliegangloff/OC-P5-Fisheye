"use client";
import styles from "./Filter.module.css";
import { useState } from "react";

export default function Filter({ filter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filter);

  const handleChange = (event) => {
    setIsOpen(false);
    setSelectedFilter(event.target.value);
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="filter">Trier par</label>
      <div className={styles.filterContainer}>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => setIsOpen(!isOpen)}
          id="filter"
          value={selectedFilter}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedFilter === "popularity" && "Popularité"}
          {selectedFilter === "date" && "Date"}
          {selectedFilter === "title" && "Titre"}
        </button>
        {isOpen && (
          <div
            className={styles.filterOptions}
            role="listbox"
            aria-activedescendant={selectedFilter}
            aria-labelledby="filter"
          >
            <button
              type="button"
              onClick={(e) => handleChange(e)}
              value="popularity"
              className={styles.filterButton}
            >
              Popularité
            </button>
            <button
              type="button"
              onClick={(e) => handleChange(e)}
              value="date"
              className={styles.filterButton}
            >
              Date
            </button>
            <button
              type="button"
              onClick={(e) => handleChange(e)}
              value="title"
              className={styles.filterButton}
            >
              Titre
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
