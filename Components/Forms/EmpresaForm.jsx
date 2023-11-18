import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionEmpresa";

//sms de confirmacion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
  InputLabel,
} from "@mui/material";

export default function EmpresaForm({
  setEmpresas,
  empresas,
  empresa,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(empresa ? empresa.nombreEmpresa : "");

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  // get functions to build form with useForm() hook
  const { register, control, setValue, handleSubmit, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("crear");

  function onSubmit(data) {
    // event.preventDefault();
    setOpen(true);
    setFormData(data);
    setType(empresa ? "editar" : "crear");
  }

  const [error, setError] = useState(null);
  async function createEmpresa(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/empresa",
        updatedRow
      );
      if (response.status === 201) {
        // Actualiza el estado para añadir la nueva empresa al frontend
        setEmpresas([...empresas, response.data]);
      } else {
        throw new Error("Error al crear la empresa");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear la empresa. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editEmpresa(idEmpresa, empresaData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/empresa/${idEmpresa}`,
        empresaData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setEmpresas(
          empresas.map((empresa) =>
            empresa.idEmpresa === idEmpresa ? response.data : empresa
          )
        );
      } else {
        throw new Error("Error al editar la empresa");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar la empresa. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      // idEmpresa: 10,
      nombreEmpresa: data.name,
    };

    empresa
      ? editEmpresa(empresa.idEmpresa, updatedRow)
      : createEmpresa(updatedRow);
  
    onSave();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Empresa</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.inputGroup}>
            <div>
              <Input
                className={`${styles.inputForm}  ${
                  errors.name ? "is-invalid" : ""
                }`}
                type="text"
                id="name"
                {...register("name")}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nombre de la empresa"
              />
              <div className={styles.error}>{errors.name?.message}</div>
            </div>
          </div>
        </div>
        <DialogActions>
          <Button type="submit">Aceptar</Button>

          <Button onClick={onCancel}>Cancelar</Button>
        </DialogActions>
        <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
          <DialogTitle>
            {type === "crear" ? "Confirmar creación" : "Confirmar modificación"}
          </DialogTitle>
          <DialogContent>
            <p>
              {type === "crear"
                ? "¿Está seguro de crear esta empresa?"
                : "¿Está seguro de modificar esta empresa?"}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirm(formData)}>Aceptar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
