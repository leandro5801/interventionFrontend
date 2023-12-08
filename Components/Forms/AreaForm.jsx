import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionArea";

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

export default function AreaForm({
  setAreas,
  areas,
  area,
  empresas,
  uebs,
  direcciones,
  uebPorId,
  direccionPorId,
  nombreEmpresa,
  nombreUeb,
  nombreDireccion,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(area ? area.nombre_area : "");
  const [empresa, setEmpresa] = useState(
    area
      ? {
          label: nombreEmpresa(
            uebPorId(direccionPorId(area.id_direccion).id_ueb).id_empresa
          ),
          value: uebPorId(direccionPorId(area.id_direccion).id_ueb).id_empresa,
        }
      : ""
  );
  const [ueb, setueb] = useState(
    area
      ? {
          label: nombreUeb(direccionPorId(area.id_direccion).id_ueb),
          value: direccionPorId(area.id_direccion).id_ueb,
        }
      : ""
  );
  const [direccion, setDireccion] = useState(
    area
      ? {
          label: nombreDireccion(area.id_direccion),
          value: area.id_direccion,
        }
      : ""
  );

  const empresasOptions =
    empresas &&
    empresas
      .filter((item) => item.cargar_empresa === false)
      .map((item) => ({
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

  const validarNombresIguales = (nombre_area, id_original) => {
    const nombre = areas
      .filter((item) => item.id_direccion === direccion.value)
      .find(
        (i) =>
          i.id_area !== id_original &&
          nombre_area.toLowerCase() === i.nombre_area.toLowerCase()
      );
    const nombreRepetido = nombre ? true : false;
    return nombreRepetido;
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
      area ? area.id_area : null
    );
    if (nombreRepetido) {
      setError("name", {
        type: "manual",
        message: "El nombre del area ya existe en la dirección seleccionada",
      });
    } else {
      setOpen(true);
      setFormData(data);
      setType(area ? "editar" : "crear");
    }
  }
  const [errorAxios, setErrorAxios] = useState(null);
  async function createArea(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/area",
        updatedRow
      );
      if (response.status === 201) {
        setAreas([...areas, response.data]);
      } else {
        throw new Error("Error al crear el area");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear el area. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editArea(id_area, areaData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/area/${id_area}`,
        areaData
      );
      if (response.status === 200) {
        setAreas(
          areas.map((area) => (area.id_area === id_area ? response.data : area))
        );
      } else {
        throw new Error("Error al editar la area");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar la area. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      nombre_area: data.name,
      id_direccion: parseInt(data.direccion.value),
    };

    area ? editArea(area.id_area, updatedRow) : createArea(updatedRow);

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
          <div>
          <InputLabel>Nombre del Área</InputLabel>
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
                ? "¿Está seguro de crear el área?"
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
