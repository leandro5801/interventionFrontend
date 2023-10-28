import styles from "../../styles/Home.module.css";
// import Select from "react-select";
import data from "../../public/structure.json";

import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validationI";

//sms de confirmacion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

const empresaOptionss = [
  { value: "Aica", label: "Aica" },
  { value: "Empresa 2", label: "empresa 2" },
  { value: "Empresa 3", label: "empresa 3" },
];
export default function FormUpdateIntervention({
  setInterventions,
  interventions,
  intervention,
  onCancel,
  onSave,
  consultores,
  trabDirProdCit,
  trabCalidadCit,
  trabDireccionCit,
  trabDirProdLior,
  trabDireccionLior,
  trabCalidadLior,
  trabDirProdAica,
  trabCalidadSh,
  trabDireccionSh,
  trabDirProdJt,
}) {
  const [name, setName] = useState(intervention ? intervention.name : "");
  const [description, setDescription] = useState(
    intervention ? intervention.description : ""
  );
  const [selectedTrabajador, setSelectedTrabajador] = useState(
    intervention
      ? { label: intervention.worker, value: intervention.worker }
      : ""
  );
  const [selectedEmpresa, setSelectedEmpresa] = useState(
    intervention
      ? { label: intervention.empresa, value: intervention.empresa }
      : ""
  );
  const [selectedUeb, setSelectedUeb] = useState(
    intervention ? { label: intervention.ueb, value: intervention.ueb } : ""
  );
  const [selectedStructure, setSelectedStructure] = useState(
    intervention
      ? { label: intervention.structure, value: intervention.structure }
      : ""
  );
  const [selectedArea, setSelectedArea] = useState(
    intervention ? { label: intervention.area, value: intervention.area } : ""
  );
  const [consultor, setConsultor] = useState(
    intervention
      ? {
          label: intervention.consultor,
          value: intervention.consultor,
        }
      : ""
  );
  const [start, setStart] = useState(intervention ? intervention.start : "");
  const [end, setEnd] = useState(intervention ? intervention.end : "");

  const consultoresOptions =
    consultores &&
    consultores.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  const handleConsultorChange = (newValue) => {
    setConsultor({ label: newValue.value, value: newValue.value });
  };

  //para poner dependencia entre los select estructuras
  const empresaOptions =
    empresaOptionss &&
    empresaOptionss.map((item) => ({
      value: item.value,
      label: item.value,
    }));
  const uebOptions = data.ueb.map((item) => ({
    value: item.ueb,
    label: item.ueb,
  }));
  const structureOptions = data.structure
    .filter((item) => (selectedUeb ? item.ueb === selectedUeb.value : false))
    .map((item) => ({
      value: item.structure,
      label: item.structure,
    }));
  const areaOptions = data.area
    .filter(
      (item) =>
        (selectedUeb ? item.ueb === selectedUeb.value : false) &&
        (selectedStructure ? item.structure === selectedStructure.value : false)
    )
    .map((item) => ({
      value: item.area,
      label: item.area,
    }));
  const handleUebChange = (newValue) => {
    setSelectedUeb(newValue);
    setSelectedStructure("");
    setSelectedArea("");
  };
  const handleStructureChange = (newValue) => {
    setSelectedStructure(newValue);
    setSelectedArea("");
  };
  const trabajadoresOptions = trabDirProdCit.map((item) => ({
    value: item.Nombre,
    label: item.Nombre,
  }));
  // if (
  //   selectedUeb &&
  //   selectedUeb.value === "CITOSTÁTICOS" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Dirección Técnico Productiva"
  // ) {
  //   trabajadoresOptions =
  //     trabDirProdCit &&
  //     trabDirProdCit
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "CITOSTÁTICOS" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Departamento de Calidad"
  // ) {
  //   trabajadoresOptions =
  //     trabCalidadCit &&
  //     trabCalidadCit
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "CITOSTÁTICOS" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Departamento de Direción"
  // ) {
  //   trabajadoresOptions =
  //     trabDireccionCit &&
  //     trabDireccionCit
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "LIORAD" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Dirección Técnico Productiva"
  // ) {
  //   trabajadoresOptions =
  //     trabDirProdLior &&
  //     trabDirProdLior
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "LIORAD" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Departamento de Direción"
  // ) {
  //   trabajadoresOptions =
  //     trabDireccionLior &&
  //     trabDireccionLior
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "LIORAD" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Departamento de Calidad"
  // ) {
  //   trabajadoresOptions =
  //     trabCalidadLior &&
  //     trabCalidadLior
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "AICA" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Dirección Técnico Productiva"
  // ) {
  //   trabajadoresOptions =
  //     trabDirProdAica &&
  //     trabDirProdAica
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "SH+" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Departamento de Calidad"
  // ) {
  //   trabajadoresOptions =
  //     trabCalidadSh &&
  //     trabCalidadSh
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "SH+" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Departamento de Direción"
  // ) {
  //   trabajadoresOptions =
  //     trabDireccionSh &&
  //     trabDireccionSh
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // } else if (
  //   selectedUeb &&
  //   selectedUeb.value === "JULIO TRIGO" &&
  //   selectedStructure &&
  //   selectedStructure.value === "Dirección Técnico Productiva"
  // ) {
  //   trabajadoresOptions =
  //     trabDirProdJt &&
  //     trabDirProdJt
  //       .filter((item) =>
  //         selectedArea ? item.Area === selectedArea.value : false
  //       )
  //       .map((item) => ({
  //         value: item.Nombre,
  //         label: item.Nombre,
  //       }));
  // }

  const defaultValues = {
    ueb: selectedUeb,
    structure: selectedStructure,
    area: selectedArea,
    consultor: consultor,
    worker: selectedTrabajador,
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
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  function onSubmit(data) {
    // event.preventDefault();
    setOpen(true);
    setFormData(data);
    setType(intervention ? "editar" : "crear");
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      id: intervention ? intervention.id : interventions.length + 1,
      name: data.name,
      description: data.description,
      ueb: data.ueb.value,
      structure: data.structure.value,
      area: data.area.value,
      consultor: data.consultor.value,
      worker: data.worker.value,
      start: data.start,
      end: data.end,
    };

    setInterventions(
      intervention ? updatedRow : (prevData) => [...prevData, updatedRow]
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
      <DialogTitle>Intervención</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.inputGroup}>
            <div>
              <Input
                className={`${styles.input}  ${
                  errors.name ? "is-invalid" : ""
                }`}
                type="text"
                id="name"
                {...register("name")}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nombre de la Intervención"
              />
              <div className={styles.error}>{errors.name?.message}</div>
            </div>
            <div>
              <Input
                className={`${styles.input}  ${
                  errors.description ? "is-invalid" : ""
                }`}
                type="text"
                id="description"
                {...register("description")}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descripción"
              />
              <div className={styles.error}>{errors.description?.message}</div>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.halfRow}>
              <Controller
                name="empresa"
                control={control}
                render={({ field }) => (
                  // <Select
                  //   id="empresa"
                  //   {...field}
                  //   className={`${styles.selectForm}  ${
                  //     errors.ueb ? "is-invalid" : ""
                  //   }`}
                  //   onChange={(selectedOption) => {
                  //     handleUebChange(selectedOption);
                  //     setValue("empresa", selectedOption);
                  //     setValue("ueb", "");
                  //     setValue("structure", "");
                  //     setValue("area", "");
                  //     setValue("worker", "");
                  //     field.onChange(selectedOption);
                  //   }}
                  //   options={empresaOptions}
                  //   maxMenuHeight={120}
                  //   placeholder="Empresa"
                  // />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                     <InputLabel id="demo-simple-select-standard-label">Empresa</InputLabel>
                  <Select
                    labelId="empresa-label"
                    id="empresa"
                    value={field.value}
                    label="empresa"
                    onChange={(event) => {
                      handleUebChange(event.target.value);
                      setValue("empresa", event.target.value);
                      setValue("ueb", "");
                      setValue("structure", "");
                      setValue("area", "");
                      setValue("worker", "");
                      field.onChange(event.target.value);
                    }}
                    className={`${styles.selectForm} ${
                      errors.ueb ? "is-invalid" : ""
                    }`}
                  >
                    {empresaOptions.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                   </FormControl>
                )}
              />
              {errors.ueb && (
                <div className={styles.error}>Seleccione una Empresa.</div>
              )}
            </div>
          </div>
          {/* <div className={styles.dateGroup}>
            <div className={styles.halfRow}>
              <label htmlFor="start">Fecha de inicio:</label>
              <Input
                type="date"
                id="start"
                {...register("start")}
                className={`${styles.inputFecha}  ${
                  errors.start ? "is-invalid" : ""
                }`}
                value={start}
                onChange={(event) => setStart(event.target.value)}
                placeholder="Fecha de Inicio"
              />
              <div className={styles.error}>{errors.start?.message}</div>
            </div>
            <div className={styles.halfRow}>
              <label htmlFor="end">Fecha de Fin:</label>
              <input
                type="date"
                id="end"
                {...register("end")}
                className={`${styles.inputFecha}  ${
                  errors.end ? "is-invalid" : ""
                }`}
                value={end}
                onChange={(event) => setEnd(event.target.value)}
              />
              <div className={styles.error}>{errors.end?.message}</div>
            </div>
          </div> */}
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
                ? "¿Está seguro de crear esta intervención?"
                : "¿Está seguro de modificar esta intervención?"}
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