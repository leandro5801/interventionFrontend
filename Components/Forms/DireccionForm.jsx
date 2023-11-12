import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionDireccion";

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

export default function DireccionForm({
  setDirecciones,
  direcciones,
  direccion,
  empresas,
  uebPorId,
  nombreEmpresa,
  nombreUeb,
  uebs,
  onCancel,
  onSave,
}) {

  const [name, setName] = useState(direccion ? direccion.nombreDireccion : "");
  const [empresa, setEmpresa] = useState(
    direccion
      ? {
          label: nombreEmpresa(uebPorId(direccion.idUeb).idEmpresa),
          value: uebPorId(direccion.idUeb).idEmpresa,
        }
      : ""
  );
  const [ueb, setueb] = useState(
    direccion
      ? {
          label: nombreUeb(direccion.idUeb),
          value: direccion.idUeb,
        }
      : ""
  );

  const empresasOptions =
    empresas &&
    empresas.map((item) => ({
      value: item.idEmpresa,
      label: item.nombreEmpresa,
    }));
    const uebsOptions =
    uebs &&
    uebs
      .filter((item) =>
        empresa && empresa.value
          ? item.idEmpresa === empresa.value
          : true
      )
      .map((item) => ({
        value: item.idUeb,
        label: item.nombreUeb,
      }));
  const handleEmpresaChange = (newValue) => {
    setEmpresa({ label: newValue.value, value: newValue.value });
  };
  const handleUebChange = (newValue) => {
    setueb({ label: newValue.value, value: newValue.value });
  };

  const defaultValues = {
    empresa: empresa,
    ueb: ueb,
  };

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
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
    setType(direccion ? "editar" : "crear");
  }
  const [error, setError] = useState(null);
  async function createDireccion(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/direccion",
        updatedRow
      );
      if (response.status === 201) {
        setDirecciones([...direcciones, response.data]);
      } else {
        throw new Error("Error al crear la dirección");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear la dirección. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editDireccion(idDireccion, direccionData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/direccion/${idDireccion}`,
        direccionData
      );
      if (response.status === 200) {
        setDirecciones(
          direcciones.map((direccion) =>
            direccion.idDireccion === idDireccion ? response.data : direccion
          )
        );
      } else {
        throw new Error("Error al editar la direccion");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar la direccion. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      nombreDireccion: data.name,
      idUeb: parseInt(data.ueb.value),
    };
    direccion
      ? editDireccion(direccion.idDireccion, updatedRow)
      : createDireccion(updatedRow);

    onSave();
    
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Dirección</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <div>
            <Controller
              name="empresa"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="empresa"
                  {...field}
                  className={`${styles.selectForm}  ${
                    errors.empresa ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleEmpresaChange(selectedOption);
                    setValue("empresa", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={empresasOptions}
                  maxMenuHeight={120}
                  placeholder="Empresa"
                />
              )}
            />
            {errors.empresa && (
              <div className={styles.error}>Seleccione una empresa.</div>
            )}
          </div>
          <div>
            <Controller
              name="ueb"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="ueb"
                  {...field}
                  className={`${styles.selectForm}  ${
                    errors.ueb ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleUebChange(selectedOption);
                    setValue("ueb", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={uebsOptions}
                  maxMenuHeight={120}
                  placeholder="Ueb"
                />
              )}
            />
            {errors.ueb && (
              <div className={styles.error}>Seleccione una UEB.</div>
            )}
          </div>
        </div>
        <div className={styles.fullRow}>
          <Input
            className={`${styles.inputFormDirec}  ${
              errors.name ? "is-invalid" : ""
            }`}
            type="text"
            id="name"
            {...register("name")}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre de la dirección"
          />
          <div className={styles.error}>{errors.name?.message}</div>
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
                ? "¿Está seguro de crear la dirección?"
                : "¿Está seguro de modificar la dirección?"}
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
