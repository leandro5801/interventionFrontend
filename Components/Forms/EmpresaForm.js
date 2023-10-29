import styles from "../../styles/Home.module.css";

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

const empresaOptionss = [
  { value: "Aica", label: "Aica" },
  { value: "Empresa 2", label: "empresa 2" },
  { value: "Empresa 3", label: "empresa 3" },
];
export default function EmpresaForm({
  setEmpresas,
  empresas,
  empresa,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(empresa ? empresa.name : "");

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
    console.log("entro");
    setOpen(true);
    setFormData(data);
    setType(empresa ? "editar" : "crear");
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      id: empresa ? empresa.id : empresas.length + 1,
      name: data.name,
    };

    setEmpresas(
      empresa ? updatedRow : (prevData) => [...prevData, updatedRow]
    );
    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
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
                placeholder="Nombre de la intervención"
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
