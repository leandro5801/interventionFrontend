import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import axios from "axios";
import { useState } from "react";

//sms de confirmacion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const animatedComponents = makeAnimated();
export default function CargarProyectoForm({ onCancel, onLoad }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleConfirm = () => {
    // Lógica para cargar el proyecto
    console.log(formData);
    onLoad(formData); // Llama a la función para cargar el proyecto
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Cargar Proyecto</DialogTitle>
      <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
        <DialogTitle>Confirmar Carga</DialogTitle>
        <DialogContent>
          <p>¿Está seguro de cargar este proyecto?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Aceptar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={() => setOpen(true)}>Cargar Proyecto</Button>
    </>
  );
}
