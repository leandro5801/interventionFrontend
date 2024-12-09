import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionCargarDatosUEB";

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

export default function UebCargarDatosForm({
  setUebs,
  ueb,
  setOpenDialogError,
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
  const [empresaId, setEmpresaId] = useState("");
  const [empresa, setEmpresa] = useState("");
  const empresasOptions =
    empresas &&
    empresas.map((item) => ({
      value: item.id_empresa,
      label: item.nombre_empresa,
    }));

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
    setOpen(true);
    setFormData(data);
    setType(ueb ? "editar" : "crear");
  }
  const [errorAxios, setErrorAxios] = useState(null);
  async function fetchUeb(Data) {
    // setCargandoUeb(true);
    try {
      
      const response = await axios.get(
        "http://localhost:3000/api/ueb/ueb/",
        Data
      );

      // const response = await axios.get(
      //   "/list_UEBs.json"
      //)
      setUebs(response.data);
      console.log(response.data);
    } catch (error) {
      // alert("ha ocurrido un error");

      setOpenDialogError(true);
    } finally {
      // setCargandoUeb(false);
    }
  }

  const handleConfirm = (data) => {
    const nombre = nombreEmpresa(parseInt(data.empresa.value));

    const updatedRow = {
      // id: ueb ? ueb.id : uebs.length + 1,
      nombre_empresa: data.empresa.label,
      id_empresa: parseInt(data.empresa.value),
    };
    fetchUeb(updatedRow);
    // ueb ? editUeb(ueb.id_ueb, updatedRow) : createUeb(updatedRow);

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
                ? "¿Está seguro de cargar las UEB?"
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
