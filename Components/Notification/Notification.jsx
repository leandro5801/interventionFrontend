import React, { useEffect, useState } from "react";

import styles from "../../styles/Home.module.css";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useNotification } from "./useNotification";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
export function NotificationBell() {
  const [animate, setAnimate] = useState(false);
  const {
    handleClick,
    unreadNotifications,
    handleClose,
    id,
    open,
    anchorEl,
    notifications,
    handleClearAll,
    handleDelete,
    handleMarkAsRead,
  } = useNotification();
  const [abrirDialog, setAbrirDialog] = useState(false);

  const handleOpenDialog = () => {
    setAbrirDialog(true);
  };
  const handleCloseDialog = () => {
    setAbrirDialog(false);
  };

  useEffect(() => {
    if (unreadNotifications > 0) {
      setAnimate(true);
      const interval = setInterval(() => {
        setAnimate((prev) => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [unreadNotifications]);
  return (
    <div className={`${styles.container}`}>
      <div
        className={`${styles.container} ${animate ? styles.animate : ""}`}
        onClick={handleClick}
      >
        <Badge
          badgeContent={unreadNotifications}
          className={styles.badge}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.5rem",
              height: "12px",
              minWidth: "12px",
              padding: "0px",
              transform: "translateX(-0.004em) translateY(-0.5em)",
              //  width: "50%",
            },
          }}
        >
          <NotificationsIcon className={styles.icon} />
        </Badge>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {notifications.length <= 0 ? (
          <Typography sx={{ p: 2 }}> No hay notificaciones</Typography>
        ) : (
          <div>
            <Typography sx={{ p: 2 }}>Notificaciones</Typography>
            <List sx={{ maxHeight: "300px", overflow: "auto" }}>
              {notifications.map((notification) => (
                <ListItem key={notification.id}>
                  <ListItemText
                    primary={notification.mensaje}
                    /* secondary={
                  notification.isRead ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )
                } */
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <HighlightOffIcon color="info" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <div className={styles.buttonContainer}>
              <Button
                onClick={handleMarkAsRead}
                size="small"
                variant="text"
                color="info"
              >
                Marcar como leídas
              </Button>
              <Button
                onClick={handleOpenDialog}
                color="error"
                size="small"
                variant="text"
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        )}
      </Popover>
      <Dialog
        open={abrirDialog}
        onClose={handleCloseDialog}
        className="my-custom-dialog"
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <p>¿Está seguro de eliminar todas las notificaciones?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClearAll();
              handleCloseDialog();
            }}
          >
            Aceptar
          </Button>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NotificationBell;
