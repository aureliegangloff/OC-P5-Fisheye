"use client";
import styles from "./ContactButton.module.css";

export default function ContactButton({ children, setIsContactModalOpen }) {
  return (
    <button
      type="button"
      className={styles.contactButton}
      onClick={() => setIsContactModalOpen(true)}
    >
      {children}
    </button>
  );
}
