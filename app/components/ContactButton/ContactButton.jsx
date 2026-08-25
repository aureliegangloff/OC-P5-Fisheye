"use client";
import styles from "./ContactButton.module.css";
import { useState } from "react";

export default function ContactButton({ children, photographer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={styles.contactButton}
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </button>

      {isModalOpen && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
              <h1 id="modalTitle" className={styles.modalTitle}>
                Contactez-moi
                <br />
                {photographer.name}
              </h1>
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Contact form"
              ></button>
            </header>
            <form
              className={styles.contactForm}
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="firstName">Prénom</label>
              <input id="firstName" name="firstName" type="text" required />

              <label htmlFor="lastName">Nom</label>
              <input id="lastName" name="lastName" type="text" required />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />

              <label htmlFor="message">Votre message</label>
              <textarea id="message" name="message" rows="5" required />

              <button
                type="submit"
                className={styles.formSubmit}
                aria-label="Send"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
