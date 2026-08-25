"use client";
import styles from "./ContactButton.module.css";

export default function ContactButton({ children, setIsModalOpen }) {
  return (
    <button
      type="button"
      className={styles.contactButton}
      onClick={() => setIsModalOpen(true)}
    >
      {children}
    </button>
  );
}
