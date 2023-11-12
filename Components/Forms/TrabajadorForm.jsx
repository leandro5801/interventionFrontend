import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionTrabajador";

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

export default function TrabajadorForm({
  setTrabajadores,
  trabajadores,
  trabajador,
  empresas,
  uebs,
  direcciones,
  areas,
  uebPorId,
  direccionPorId,
  areaPorId,
  nombreEmpresa,
  nombreUeb,
  nombreDireccion,
  nombreArea,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(trabajador ? trabajador.nombreTrabajador : "");
  const [empresa, setEmpresa] = useState(
    trabajador
      ? {
          label: nombreEmpresa(
            uebPorId(
              direccionPorId(areaPorId(trabajador.idArea).idDireccion).idUeb
            ).idEmpresa
          ),
          value: uebPorId(
            direccionPorId(areaPorId(trabajador.idArea).idDireccion).idUeb
          ).idEmpresa,
        }
      : ""
  );
  const [ueb, setueb] = useState(
    trabajador
      ? {
          label: nombreUeb(
            direccionPorId(areaPorId(trabajador.idArea).idDireccion).idUeb
          ),
          value: direccionPorId(areaPorId(trabajador.idArea).idDireccion).idUeb,
        }
      : ""
  );
  const [direccion, setDireccion] = useState(
    trabajador
      ? {
          label: nombreDireccion(areaPorId(trabajador.idArea).idDireccion),
          value: areaPorId(trabajador.idArea).idDireccion,
        }
      : ""
  );
  const [area, setArea] = useState(
    trabajador
      ? {
          label: nombreArea(trabajador.idArea),
          value: trabajador.idArea,
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
        empresa && empresa.value ? item.idEmpresa === empresa.value : true
      )
      .map((item) => ({
        value: item.idUeb,
        label: item.nombreUeb,
      }));
  const direccionesOptions =
    direcciones &&
    direcciones
      .filter((item) => (ueb && ueb.value ? item.idUeb === ueb.value : true))
      .map((item) => ({
        value: item.idDireccion,
        label: item.nombreDireccion,
      }));
  const areasOptions =
    areas &&
    areas
      .filter((item) => (direccion && direccion.value ? item.idDireccion === direccion.value : true))
      .map((item) => ({
        value: item.idArea,
        label: item.nombreArea,
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
  const handleAreaChange = (newValue) => {
    setArea({ label: newValue.value, value: newValue.value });
  };

  const defaultValues = {
    empresa: empresa,
    ueb: ueb,
    direccion: direccion,
    area: area,
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
    setType(trabajador ? "editar" : "crear");
  }
  const [error, setError] = useState(null);
  async function createTrabajador(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/trabajador",
        updatedRow
      );
      if (response.status === 201) {
        setTrabajadores([...trabajadores, response.data]);
      } else {
        throw new Error("Error al crear el trabajador");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear el trabajador. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editTrabajador(idTrabajador, trabajadorData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/trabajador/${idTrabajador}`,
        trabajadorData
      );
      if (response.status === 200) {
        setTrabajadores(
          trabajadores.map((trabajador) => (trabajador.idTrabajador === idTrabajador ? response.data : trabajador))
        );
      } else {
        throw new Error("Error al editar la trabajador");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar la trabajador. Por favor, inténtalo de nuevo."
      );
    }
  }
  const handleConfirm = (data) => {
    const updatedRow = {
      nombreTrabajador: data.name,
      idArea: parseInt(data.area.value),
    };
    trabajador
    ? editTrabajador(trabajador.idTrabajador, updatedRow)
    : createTrabajador(updatedRow);

    onSave();

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Trabajador</DialogTitle>
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
                  className={`${styles.selectFormRec}  ${
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
                  placeholder="Ueb"
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
                  placeholder="Dirección"
                />
              )}
            />
            {errors.direccion && (
              <div className={styles.error}>Seleccione una dirección.</div>
            )}
          </div>
          <div>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="area"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.area ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleAreaChange(selectedOption);
                    setValue("area", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={areasOptions}
                  maxMenuHeight={120}
                  placeholder="Área"
                />
              )}
            />
            {errors.area && (
              <div className={styles.error}>Seleccione un área.</div>
            )}
          </div>
        </div>
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
            placeholder="Nombre del Trabajador"
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
                ? "¿Está seguro de crear el trabajador?"
                : "¿Está seguro de modificar el trabajador?"}
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
