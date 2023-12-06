import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionCargarDatosDireccion";

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

export default function DireccionCargarDatosForm({
  setDirecciones,
  direcciones,
  direccion,
  empresas,
  uebPorId,
  nombreEmpresa,
  setOpenDialogError,
  nombreUeb,
  uebs,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(direccion ? direccion.nombre_direccion : "");
  const [empresa, setEmpresa] = useState(
    ""
  );
  const [ueb, setueb] = useState(
    ""
  );

  const [uebId, setUebId] = useState("");
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
    setType(direccion ? "editar" : "crear");
  }

  async function fetchDireccion(Data) {
    // setCargandoUeb(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/direccion/direccion/",
        Data
      );
      setDirecciones(response.data);
    } catch (error) {
      // alert("ha ocurrido un error");

      setOpenDialogError(true);
    } finally {
      // setCargandoUeb(false);
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      nombre_ueb: data.ueb.label,
      nombre_empresa: data.empresa.label,
    };
    fetchDireccion(updatedRow);
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
                    setValue("ueb", "");
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
                    setUebId(parseInt(selectedOption.value));
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
                ? "¿Está seguro de cargar las direcciones?"
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
