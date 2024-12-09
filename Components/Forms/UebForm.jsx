import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionUeb";

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

export default function UebForm({
  setUebs,
  uebs,
  ueb,
  empresas,
  onCancel,
  onSave,
}) {
  //para retornar el nombre de la empresa y no el id
  const nombreEmpresa = (id_empresa) => {
    const empresa = empresas.find((e) => e.id_empresa === id_empresa);
    const name = empresa ? empresa.nombre_empresa : "no se encontro el nombre";
    return name;
  };

  const [name, setName] = useState(ueb ? ueb.nombre_ueb : "");
  const [empresaId, setEmpresaId] = useState(ueb ? ueb.id_empresa : "");

  const [empresa, setEmpresa] = useState(
    ueb
      ? {
          label: nombreEmpresa(ueb.id_empresa),
          value: ueb.id_empresa,
        }
      : ""
  );
  const empresasOptions =
    empresas &&
    empresas
      .map((item) => ({
        value: item.id_empresa,
        label: item.nombre_empresa,
      }));

  const validarNombresIguales = (nombre_ueb, id_original) => {
    const nombre = uebs
      .filter((item) => item.id_empresa === empresaId)
      .find(
        (i) =>
          i.id_ueb !== id_original &&
          nombre_ueb.toLowerCase() === i.nombre_ueb.toLowerCase()
      );
    const nombreRepetido = nombre ? true : false;
    return nombreRepetido;
  };

  const defaultValues = {
    empresa: empresa,
  };

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };

  // get functions to build form with useForm() hook
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState,
    setError,
  } = useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("crear");

  function onSubmit(data) {
    const nombreRepetido = validarNombresIguales(
      data.name,
      ueb ? ueb.id_ueb : null
    );
    if (nombreRepetido) {
      setError("name", {
        type: "manual",
        message: "El nombre de la ueb ya existe en la empresa seleccionada",
      });
    } else {
      setOpen(true);
      setFormData(data);
      setType(ueb ? "editar" : "crear");
    }
  }
  const [errorAxios, setErrorAxios] = useState(null);
  async function createUeb(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ueb/ueb",
        updatedRow
      );
      if (response.status === 201) {
        setUebs([...uebs, response.data]);
      } else {
        throw new Error("Error al crear la ueb");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear la ueb. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editUeb(id_ueb, uebData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/ueb/${id_ueb}`,
        uebData
      );
      if (response.status === 200) {
        setUebs(
          uebs.map((ueb) => (ueb.id_ueb === id_ueb ? response.data : ueb))
        );
      } else {
        throw new Error("Error al editar la ueb");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar la ueb. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const nombre = nombreEmpresa(parseInt(data.empresa.value));

    const updatedRow = {
      // id: ueb ? ueb.id : uebs.length + 1,
      nombre_ueb: data.name,
      id_empresa: parseInt(data.empresa.value),
    };

    ueb ? editUeb(ueb.id_ueb, updatedRow) : createUeb(updatedRow);

    onSave();
    onSave();

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>UEB</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <div>
          <InputLabel>Empresa</InputLabel>
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
                    setEmpresaId(parseInt(selectedOption.value));
                    // setValue("empresa", selectedOption.label);
                    field.onChange(selectedOption);
                  }}
                  options={empresasOptions}
                  maxMenuHeight={120}
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.empresa && (
              <div className={styles.error}>Seleccione una empresa.</div>
            )}
          </div>

          <div>
          <InputLabel>UEB</InputLabel>
            <Input
              className={`${styles.inputForm}  ${
                errors.name ? "is-invalid" : ""
              }`}
              type="text"
              id="name"
              {...register("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}

            />
            <div className={styles.error}>{errors.name?.message}</div>
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
                ? "¿Está seguro de crear la ueb?"
                : "¿Está seguro de modificar la ueb?"}
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
