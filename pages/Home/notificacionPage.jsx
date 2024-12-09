import { useContext } from "react";
import { NotificationContext } from "../../contexts/notification/NotificationContext";
import styles from "../../styles/Home.module.css";
export default function notificacionPage() {
  const { notifications } = useContext(NotificationContext);
  return (
    <div className={styles.title}>
      <h3 className={styles.tituloH3}>Notificaciones</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}
