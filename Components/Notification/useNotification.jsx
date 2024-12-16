import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { NotificationContext } from "../../contexts/notification/NotificationContext";
import axios from "axios";
import { UserContext } from "../../contexts/user/UserContext";
import { Notifications } from "@mui/icons-material";
import { toast } from "react-toastify";
import style from "../../styles/Home.module.css";
export function useNotification() {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(UserContext);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [idConsultor, setIdConsultor] = useState(false);
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false); // Estado para el botón

  const handleDelete = async (id) => {
    console.log(id);

    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
    try {
      await axios.delete(`http://localhost:3000/api/notificacion/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearAll = async () => {
    setNotifications([]);
    try {
      await axios.delete(
        `http://localhost:3000/api/notificacion/consultor/${idConsultor}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleMarkAsRead = () => {
    setIsMarkingAsRead(true);
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
    setUnreadNotifications(0);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  const increment = useCallback(() => {
    setUnreadNotifications((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setUnreadNotifications((prev) => prev - 1);
  }, []);

  const handleClick = (event) => {
    setUnreadNotifications(0);
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/api/consultor/${user.id_usuario}`)
        .then((response) => {
          setNotifications(response.data.notifications);
          setIdConsultor(response.data.id_consultor);
          if (response.data.notifications.length > 0)
            response.data.notifications.forEach((notification) => {
              if (!notification.isRead) increment();
            });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (idConsultor) {
      const socketIo = io("http://localhost:3000", {
        query: { consultorId: idConsultor },
      });

      socketIo.on("notification", (notification) => {
        console.log(notification);
        setNotifications((prev) => [...prev, notification]);
        setIsMarkingAsRead(false);
        toast(
          <div className={style.toast_custom}>
            <Notifications className={style.toast_icon} />
            <div>
              <div className={style.toast_title}>{notification.titulo}</div>
              <div className={style.toast_message}>{notification.mensaje}</div>
            </div>
          </div>,
          {
            closeButton: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        increment();
      });

      setSocket(socketIo);

      return () => {
        socketIo.disconnect();
      };
    }
  }, [idConsultor]);

  return {
    socket,
    notifications,
    handleClick,
    unreadNotifications,
    handleClose,
    id,
    open,
    anchorEl,
    notifications,
    handleClearAll,
    handleMarkAsRead,
    handleDelete,
    isMarkingAsRead,
    setIsMarkingAsRead,
  };
}
