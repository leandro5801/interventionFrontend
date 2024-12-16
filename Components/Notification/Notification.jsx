import React, { useEffect, useState } from "react";

import styles from "../../styles/Home.module.css";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

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
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useNotification } from "./useNotification";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Image from "next/image";
export function NotificationBell() {
  // const [animate, setAnimate] = useState(false);
  const {
    handleClick,
    unreadNotifications,
    handleClose,
    id,
    open,
    anchorEl,
    notifications,
    handleClearAll,
    setIsMarkingAsRead,
    isMarkingAsRead,
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

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.container}`} onClick={handleClick}>
        <Tooltip title="Notififcaciones">
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
        </Tooltip>
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
        sx={{
          maxWidth: "550px",
          maxHeight: "400px", // Limitar el ancho
        }}
      >
        {notifications.length <= 0 ? (
          <Typography sx={{ p: 1 }}> No hay notificaciones</Typography>
        ) : (
          <div>
            <Typography sx={{ p: 1 }}>Notificaciones</Typography>
            <hr />
            <List
              sx={{
                maxHeight: "200px",
                overflow: "auto",
                padding: 0,
                "&::-webkit-scrollbar": {
                  width: "6px",
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
              }}
            >
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover, // Usa el color de hover del tema
                      transition: "background-color 0.3s ease", // Transición suave
                    },
                    cursor: "default",
                  }}
                >
                  <Image
                    src={`/images/proyect.jpg`}
                    alt="Proyecto"
                    width={140} // Ancho de la imagen
                    height={60} // Alto de la imagen
                    style={{ borderRadius: "50%", marginRight: "5%" }}
                  />
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
                  {/* Badge para notificaciones no leídas */}
                  {!notification.isRead && (
                    <Badge
                      color="primary"
                      variant="dot"
                      sx={{ marginLeft: 1 }} // Espaciado a la izquierda
                    />
                  )}
                  <ListItemSecondaryAction>
                    <Tooltip title="Eliminar notificación" arrow>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <HighlightOffIcon color="info" />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <div className={styles.buttonContainer}>
              <Tooltip title="Marcar como leídas" arrow>
                <Button
                  disabled={isMarkingAsRead}
                  onClick={handleMarkAsRead}
                  size="small"
                  variant="text"
                  color="info"
                >
                  <MarkEmailReadIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Eliminar todas notificaciones">
                <Button
                  onClick={handleOpenDialog}
                  color="error"
                  size="small"
                  variant="text"
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
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
