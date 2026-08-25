"use client";
import Modal from "../Modal/Modal";
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
        <Modal photographer={photographer} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}
