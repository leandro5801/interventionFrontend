import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";

import styles from "../../styles/Home.module.css";

export default function FormDialog({ open, handleClose, FormComponent, ...formProps }) {
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
   
      style: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        maxWidth: '5000px', // Establece el ancho máximo que desees para el diálogo
        height: 'fit-content',
        padding: '16px',
        overflowX: 'auto'
      },
    }}
  >
    <FormComponent {...formProps} />
  </Dialog>
  );
}
