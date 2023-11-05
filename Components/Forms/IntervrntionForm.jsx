import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";
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
  InputLabel,
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
  trabajadores,
  direcciones,
  areas,
  trabCalidadCit,
  trabDireccionCit,
  trabDirProdLior,
  trabDireccionLior,
  trabCalidadLior,
  trabDirProdAica,
  trabCalidadSh,
  trabDireccionSh,
  trabDirProdJt,
  empresas,
  uebs,
}) {
  //para retornar el nombre de la empresa y no el id
  const nombreEmpresa = (empresaId) => {
    const empresa = empresas.find((e) => e.id === empresaId);
    const name = empresa ? empresa.name : "no se encontro el nombre";
    return name;
  };
  //para retornar el nombre de la empresa y no el id
  const nombreUeb = (uebId) => {
    const ueb = uebs.find((e) => e.id === uebId);
    const name = ueb ? ueb.name : "no se encontro el nombre";
    return name;
  };

  const [name, setName] = useState(intervention ? intervention.name : "");
  const [description, setDescription] = useState(
    intervention ? intervention.description : ""
  );
  const [selectedTrabajador, setSelectedTrabajador] = useState(
    intervention
      ? { label: intervention.worker, value: intervention.worker }
      : ""
  );
  const [empresaId, setEmpresaId] = useState(
    intervention ? intervention.empresaId : ""
  );
  const [empresa, setEmpresa] = useState(
    intervention
      ? {
          label: nombreEmpresa(intervention.empresaId),
          value: intervention.empresaId,
        }
      : ""
  );
  const [uebId, setUebId] = useState(intervention ? intervention.uebId : "");
  const [ueb, setUeb] = useState(
    intervention
      ? {
          label: nombreUeb(intervention.uebId),
          value: intervention.uebId,
        }
      : ""
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
  const empresasOptions =
    empresas &&
    empresas.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const uebOptions =
    uebs &&
    uebs
     .filter((item) => (empresaId ? item.empresaId === empresaId : false))
     .map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const handleEmpresaChange = (newValue) => {
    setEmpresa({ label: newValue.value, value: newValue.value });
  };

  const structureOptions = direcciones
    // .filter((item) => (ueb ? item.ueb === ueb.value : false))
    .map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const areaOptions = areas
    // .filter((item) =>
    //   // (ueb ? item.ueb === ueb.value : false) &&
    //   selectedStructure ? item.structure === selectedStructure.value : false
    // )
    .map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const handleUebChange = (newValue) => {
    setUeb(newValue);
    setSelectedStructure("");
    setSelectedArea("");
  };
  const handleStructureChange = (newValue) => {
    setSelectedStructure(newValue);
    setSelectedArea("");
  };
  const trabajadoresOptions = trabajadores.map((item) => ({
    value: item.id,
    label: item.name,
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
    empresa: empresa,
    ueb: ueb,
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
    const nombre = nombreEmpresa(parseInt(data.empresa.value));
    const updatedRow = {
      id: intervention ? intervention.id : interventions.length + 1,
      name: data.name,
      description: data.description,
      empresaId: parseInt(data.empresa.value),
      uebId: parseInt(data.ueb.value),
      structure: data.structure.label,
      area: data.area.label,
      consultor: data.consultor.value,
      worker: data.worker.label,
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
            <div>
              <Input
                className={`${styles.inputForm}  ${
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
                  <Select
                    styles={customStyles}
                    id="empresa"
                    {...field}
                    className={`${styles.selectForm}  ${
                      errors.empresa ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOption) => {
                      setEmpresaId(parseInt(selectedOption.value));
                      // setValue("empresa", selectedOption);
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

            <div className={styles.halfRow}>
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
                      setUebId(parseInt(selectedOption.value));
                      field.onChange(selectedOption);
                    }}
                    options={uebOptions}
                    maxMenuHeight={120}
                    placeholder="UEB"
                  />
                )}
              />
              {errors.ueb && (
                <div className={styles.error}>Seleccione una UEB.</div>
              )}
            </div>

            <div className={styles.halfRow}>
              <Controller
                name="structure"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={customStyles}
                    id="structure"
                    {...field}
                    className={`${styles.selectForm}  ${
                      errors.structure ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOption) => {
                      handleStructureChange(selectedOption);
                      setValue("structure", selectedOption);
                      setValue("area", "");
                      setValue("worker", "");
                      field.onChange(selectedOption);
                    }}
                    options={structureOptions}
                    maxMenuHeight={120}
                    placeholder="Dirección"
                  />
                )}
              />

              {errors.structure && (
                <div className={styles.error}>Seleccione una Dirección.</div>
              )}
            </div>
            <div className={styles.halfRow}>
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={customStyles}
                    id="area"
                    {...field}
                    className={`${styles.selectForm}  ${
                      errors.area ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOption) => {
                      setSelectedArea(selectedOption);
                      setValue("area", selectedOption);
                      setValue("worker", "");
                      field.onChange(selectedOption);
                    }}
                    options={areaOptions}
                    maxMenuHeight={120}
                    placeholder="Área"
                  />
                )}
              />
              {errors.area && (
                <div className={styles.error}>Seleccione un Área.</div>
              )}
            </div>

            <div className={styles.halfRow}>
              <Controller
                name="consultor"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={customStyles}
                    id="consultor"
                    {...field}
                    className={`${styles.selectForm}  ${
                      errors.consultor ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOption) => {
                      handleConsultorChange(selectedOption);
                      setValue("consultor", selectedOption);
                      field.onChange(selectedOption);
                    }}
                    options={consultoresOptions}
                    maxMenuHeight={120}
                    placeholder="Consultor"
                  />
                )}
              />
              {errors.consultor && (
                <div className={styles.error}>Seleccione un Consultor.</div>
              )}
            </div>

            <div className={styles.halfRow}>
              <Controller
                name="worker"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={customStyles}
                    id="worker"
                    {...field}
                    className={`${styles.selectForm}  ${
                      errors.worker ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOption) => {
                      setSelectedTrabajador(selectedOption);
                      setValue("worker", selectedOption);
                      field.onChange(selectedOption);
                    }}
                    options={
                      trabajadoresOptions &&
                      trabajadoresOptions.map((sup) => ({
                        label: sup.label,
                        value: sup.label,
                      }))
                    }
                    maxMenuHeight={120}
                    placeholder="Trabajador"
                  />
                )}
              />
              {errors.worker && (
                <div className={styles.error}>Seleccione un Trabajador.</div>
              )}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <InputLabel id="demo-simple-select-standard-label">
                Fecha de fin
              </InputLabel>
              <Input
                type="date"
                id="start"
                {...register("start")}
                className={`${styles.inputForm}  ${
                  errors.start ? "is-invalid" : ""
                }`}
                value={start}
                onChange={(event) => setStart(event.target.value)}
                placeholder="Fecha de Inicio"
              />
              <div className={styles.error}>{errors.start?.message}</div>
            </div>
            <div>
              <InputLabel id="demo-simple-select-standard-label">
                Fecha de inicio
              </InputLabel>
              <Input
                type="date"
                id="end"
                label="Fecha de fin"
                {...register("end")}
                className={`${styles.inputForm}  ${
                  errors.end ? "is-invalid" : ""
                }`}
                value={end}
                onChange={(event) => setEnd(event.target.value)}
              />
              <div className={styles.error}>{errors.end?.message}</div>
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
