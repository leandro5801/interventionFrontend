import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionCargarDatosArea";

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

export default function AreaCargarDatosForm({
  setAreas,
  areas,
  area,
  empresas,
  uebs,
  direcciones,
  setOpenDialogError,
  onCancel,
  onSave,
}) {
  const [empresa, setEmpresa] = useState("");
  const [ueb, setueb] = useState("");
  const [direccion, setDireccion] = useState("");

  const empresasOptions =
    empresas &&
    empresas.map((item) => ({
      value: item.id_empresa,
      label: item.nombre_empresa,
    }));

  const uebsOptions =
    uebs &&
    uebs
      .filter((item) =>
        empresa && empresa.value ? item.id_empresa === empresa.value : true
      )
      .map((item) => ({
        value: item.id_ueb,
        label: item.nombre_ueb,
      }));
  const direccionesOptions =
    direcciones &&
    direcciones
      .filter((item) => (ueb && ueb.value ? item.id_ueb === ueb.value : true))
      .map((item) => ({
        value: item.id_direccion,
        label: item.nombre_direccion,
      }));

  const handleEmpresaChange = (newValue) => {
    setEmpresa({ label: newValue.value, value: newValue.value });
  };
  const handleUebChange = (newValue) => {
    setueb({ label: newValue.value, value: newValue.value });
  };
  const handleDireccionChange = (newValue) => {
    setDireccion({ label: newValue.value, value: newValue.value });
  };

  const defaultValues = {
    empresa: empresa,
    ueb: ueb,
    direccion: direccion,
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
    setOpen(true);
    setFormData(data);
    setType(area ? "editar" : "crear");
  }
  const [errorAxios, setErrorAxios] = useState(null);
  async function fetchDireccion(Data) {
    // setCargandoUeb(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/area/area/",
        Data
      );
      setAreas(response.data);
    } catch (error) {
      // alert("ha ocurrido un error");

      setOpenDialogError(true);
    } finally {
      // setCargandoUeb(false);
    }
  }
  const handleConfirm = (data) => {
    const updatedRow = {
      nombre_empresa: data.empresa.label,
      nombre_ueb: data.ueb.label,
      nombre_direccion: data.direccion.label,
    };
    fetchDireccion(updatedRow)
    console.log(updatedRow);

    onSave();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Área</DialogTitle>
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
                  className={`${styles.selectFormRec}  ${
                    errors.empresa ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleEmpresaChange(selectedOption);
                    setValue("empresa", selectedOption);
                    setValue("ueb", "");
                    setValue("direccion", "");
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
            <Controller
              name="ueb"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="ueb"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.ueb ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleUebChange(selectedOption);
                    setValue("ueb", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={uebsOptions}
                  maxMenuHeight={120}
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.ueb && (
              <div className={styles.error}>Seleccione una UEB.</div>
            )}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div>
          <InputLabel>Dirección</InputLabel>
            <Controller
              name="direccion"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="direccion"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.direccion ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleDireccionChange(selectedOption);
                    setValue("direccion", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={direccionesOptions}
                  maxMenuHeight={120}
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.direccion && (
              <div className={styles.error}>Seleccione una dirección.</div>
            )}
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
                ? "¿Está seguro de cargar las áreas?"
                : "¿Está seguro de modificar el área?"}
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
