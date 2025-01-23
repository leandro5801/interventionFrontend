import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { Cancel, Notifications, CalendarToday } from "@mui/icons-material";
import { useEffect } from "react";
import { formatNotificationDate } from "../../helpers/dateFunctions";
import { useState } from "react";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";

// Animación de zoom
const zoomIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Estilo del diálogo
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    animation: `${zoomIn} 0.2s ease-in-out`,
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: "#2196F3", // Azul vibrante
    color: "white", // Texto blanco
  },
  "& .MuiDialogContent-root": {
    backgroundColor: "#2196F3",
  },
  "& .MuiDialogActions-root": {
    backgroundColor: "#2196F3",
  },
}));

export default function NotificationDialog({
  open,
  notification,
  handleClose,
}) {
  const [sinceCreatedProyect, setSinceCreatedProyect] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const dateCreated = formatNotificationDate(notification.createdAt);
    setSinceCreatedProyect(dateCreated);
  }, []);

  return (
    <StyledDialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      style={
        {
          // Animación de aparición
        }
      }
    >
      <DialogTitle
        id="responsive-dialog-title"
        style={{ display: "flex", alignItems: "center", color: "" }}
      >
        <Notifications style={{ marginRight: "8px", color: "white" }} />
        {"Notificación recibida"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: "InfoText", marginTop: 5 }}>
          {notification.mensaje}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogContentText
          style={{ display: "flex", alignItems: "center", color: "black" }}
        >
          <CalendarToday style={{ marginRight: "4px", color: "black" }} />
          {sinceCreatedProyect}
        </DialogContentText>
        <IconButton onClick={handleClose} style={{ color: "white" }}>
          <Cancel />
        </IconButton>
      </DialogActions>
    </StyledDialog>
  );
}
