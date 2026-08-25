import styles from "./ContactModal.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

export default function ContactModal({
  photographer,
  isModalOpen,
  setIsModalOpen,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      buttonLabel="Close Contact form"
    >
      <header className={styles.modalHeader}>
        <h1 id="modalTitle" className={styles.modalTitle}>
          Contactez-moi
          <br />
          {photographer.name}
        </h1>
      </header>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          required
          autoFocus
        />

        <label htmlFor="lastName">Nom</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Votre message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.formSubmit}>
          Envoyer
        </button>
      </form>
    </Modal>
  );
}
