import { useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { NotificationContext } from "../../contexts/notification/NotificationContext";
import axios from "axios";
import { UserContext } from "../../contexts/user/UserContext";

import { toast } from "react-toastify";

export function useNotification() {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(UserContext);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };
  const handleClearAll = () => {
    setNotifications([]);
  };
  const handleMarkAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  const increment = useCallback(() => {
    setUnreadNotifications(unreadNotifications + 1);
  }, [unreadNotifications]);

  const decrement = useCallback(() => {
    setUnreadNotifications(unreadNotifications - 1);
  }, [unreadNotifications]);

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
          if (response.data.notifications.length > 0)
            response.data.notifications.forEach((notification) => {
              if (!notification.isRead) increment();
            });
        });
    } catch (error) {
      console.log(error);
    }
    const socketIo = io("http://localhost:3000");

    socketIo.on("notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
      toast.info(notification.mensaje);
      increment();
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

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
  };
}
