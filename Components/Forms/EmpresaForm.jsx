import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";

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
  const [name, setName] = useState(empresa ? empresa.nombre_empresa : "");
  const [cargar_empresa, setCargarEmpresa] = useState(
    empresa ? (empresa.cargar_empresa === true ? "Sí" : "No") : ""
  );
  const [editando, setEditando] = useState(empresa ? true : false);
  const [seCargan, setSeCargan] = useState(empresa ? false : null);

  const handleCarganChange = (event) => {
    setCargarEmpresa(event);
    if (event === "Sí") {
      setSeCargan(true);
    } else if (event === "No") {
      setSeCargan(false);
    }
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [{ value: "AICA+", label: "AICA+" }];
  const validarNombresIguales = (nombre_empresa, id_original) => {
    const nombre = empresas.find(
      (i) =>
        i.id_empresa !== id_original &&
        nombre_empresa.toLowerCase() === i.nombre_empresa.toLowerCase()
    );
    const nombreRepetido = nombre ? true : false;
    return nombreRepetido;
  };

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
  };
  const defaultValues = {
    name: name,
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
      empresa ? empresa.id : null
    );
    if (nombreRepetido) {
      setError("name", {
        type: "manual",
        message: "El nombre de la empresa ya existe",
      });
    } else {
      setOpen(true);
      setFormData(data);
      setType(empresa ? "editar" : "crear");
    }
  }

  const [errorAxios, setErrorAxios] = useState(null);
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
  async function editEmpresa(id_empresa, empresaData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/empresa/${id_empresa}`,
        empresaData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setEmpresas(
          empresas.map((empresa) =>
            empresa.id_empresa === id_empresa ? response.data : empresa
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
      // id_empresa: 10,
      nombre_empresa: data.name,
      cargar_empresa: data.cargar_empresa === "Sí" ? true : false,
    };
    empresa
      ? editEmpresa(empresa.id_empresa, updatedRow)
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
          <div>
            <div>
              {!editando ? (
                <div>
                  <>
                    <InputLabel id="demo-simple-select-standard-label">
                      ¿Se van a cargar los datos de la empresa?
                    </InputLabel>
                    <div className={styles.inputGroup}>
                      <InputLabel>
                        Sí{" "}
                        <input
                          className={styles.input}
                          type="radio"
                          name="cargar_empresa"
                          value="Sí"
                          {...register("cargar_empresa")}
                          checked={cargar_empresa === "Sí"}
                          onChange={(event) =>
                            handleCarganChange(event.target.value)
                          }
                        />
                      </InputLabel>
                      <InputLabel>
                        No{" "}
                        <input
                          className={styles.input}
                          type="radio"
                          name="cargar_empresa"
                          value="No"
                          {...register("cargar_empresa")}
                          checked={cargar_empresa === "No"}
                          onChange={(event) =>
                            handleCarganChange(event.target.value)
                          }
                        />
                      </InputLabel>
                    </div>
                    {errors.cargar_empresa && (
                      <div className="invalid-feedback">
                        {errors.cargar_empresa?.message}
                      </div>
                    )}
                  </>
                </div>
              ) : (
                false
              )}
              {/* <div className={styles.error}>
                {errors.cargar_empresa?.message}
              </div> */}
              {/* <input
                className={`  ${errors.cargar_empresa ? "is-invalid" : ""}`}
                type="checkbox"
                id="cargarEmpresa"
                {...register("cargarEmpresa")}
                checked={cargarEmpresa}
                onChange={(event) => {
                  setCargarEmpresa(event.target.checked);
                }}
              /> */}
            </div>

            {seCargan === false ? (
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
              </div>
            ) : (
              false
            )}
            {seCargan === true ? (
              <>
                <div>
                  <Controller
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customStyles}
                        id="name"
                        // {...field}
                        className={`${styles.selectFormRec}  ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        value={selectedOption}
                        onChange={(selectedOption) => {
                          setSelectedOption(selectedOption);
                          setName(selectedOption.value);
                          setValue("name", selectedOption.value);
                          field.onChange(selectedOption.value);
                        }}
                        options={options}
                        placeholder="Nombre Empresa"
                      />
                    )}
                  />
                </div>
              </>
            ) : (
              false
            )}
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
