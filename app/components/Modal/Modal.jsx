import styles from "./Modal.module.css";
import { useEffect } from "react";
export default function Modal({
  children,
  isModalOpen,
  setIsModalOpen,
  buttonLabel,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, setIsModalOpen]);

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.modalCloseButton}
          onClick={() => setIsModalOpen(false)}
          aria-label={buttonLabel}
        ></button>

        {children}
      </div>
    </div>
  );
}
