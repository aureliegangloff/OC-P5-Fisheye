import styles from "./Modal.module.css";
import { useEffect } from "react";
export default function Modal({
  children,
  setIsModalOpen,
  buttonCloseLabel,
  style,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsModalOpen]);

  return (
    <div
      className={`${styles.modal} ${style ? styles.light : ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden="false"
      aria-label="Modal window"
    >
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.modalCloseButton}
          onClick={() => setIsModalOpen(false)}
          aria-label={buttonCloseLabel}
          autoFocus
        ></button>

        {children}
      </div>
    </div>
  );
}
