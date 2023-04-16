import styles from "../styles/Home.module.css";

export default function Dialog({ open, onClose, children }) {
  if (!open) return null;

  return (
      <div className={styles.dialogOverlay} onClick={onClose}>
          <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.dialogHeader}>
                  <h2 className={styles.dialogTitle}>Intervención</h2>
                  <button className={styles.dialogCloseButton} onClick={onClose}>
                      X
                  </button>
              </div>
              <div className={styles.dialogBody}>{children}</div>
          </div>
      </div>
  );
}