import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";
import data from "../../public/structure.json";

import axios from "axios";
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
  projects,
  empresas,
  uebs,
  nombreEmpresa,
  nombreUeb,
  nombreTrabajador,
  nombreArea,
  nombreDireccion,
  nombreConsultor,
  nombreProyecto,
  areaPorId,
  direccionPorId,
  uebPorId,
}) {
  const [name, setName] = useState(
    intervention ? intervention.nombre_intervencion : ""
  );
  const [description, setDescription] = useState(
    intervention ? intervention.descripcion : ""
  );
  const [selectedTrabajador, setSelectedTrabajador] = useState(
    intervention
      ? {
          label: nombreTrabajador(intervention.id_trabajador),
          value: intervention.id_trabajador,
        }
      : ""
  );
  const [proyectoId, setProyectoId] = useState(
    intervention ? intervention.id_proyecto : ""
  );
  const [proyecto, setProyecto] = useState(
    intervention
      ? {
          label: nombreProyecto(intervention.id_proyecto),
          value: intervention.id_proyecto,
        }
      : ""
  );

  const [empresaId, setEmpresaId] = useState(
    intervention
      ? uebPorId(
          direccionPorId(areaPorId(intervention.id_area).idDireccion).idUeb
        ).idEmpresa
      : ""
  );
  const [empresa, setEmpresa] = useState(
    intervention
      ? {
          label: nombreEmpresa(
            uebPorId(
              direccionPorId(areaPorId(intervention.id_area).idDireccion).idUeb
            ).idEmpresa
          ),
          value: uebPorId(
            direccionPorId(areaPorId(intervention.id_area).idDireccion).idUeb
          ).idEmpresa,
        }
      : ""
  );
  const [uebId, setUebId] = useState(
    intervention
      ? direccionPorId(areaPorId(intervention.id_area).idDireccion).idUeb
      : ""
  );
  const [ueb, setUeb] = useState(
    intervention
      ? {
          label: nombreUeb(
            direccionPorId(areaPorId(intervention.id_area).idDireccion).idUeb
          ),
          value: direccionPorId(areaPorId(intervention.id_area).idDireccion)
            .idUeb,
        }
      : ""
  );
  const [selectedStructure, setSelectedStructure] = useState(
    intervention
      ? {
          label: nombreDireccion(areaPorId(intervention.id_area).idDireccion),
          value: areaPorId(intervention.id_area).idDireccion,
        }
      : ""
  );
  const [selectedArea, setSelectedArea] = useState(
    intervention
      ? { label: nombreArea(intervention.id_area), value: intervention.id_area }
      : ""
  );
  const [consultor, setConsultor] = useState(
    intervention
      ? {
          label: nombreConsultor(intervention.id_consultor),
          value: intervention.id_consultor,
        }
      : ""
  );
  const [start, setStart] = useState(
    intervention ? intervention.start_date : ""
  );
  const [end, setEnd] = useState(intervention ? intervention.end_date : "");

  const consultoresOptions =
    consultores &&
    consultores.map((item) => ({
      value: item.id_consultor,
      label: item.nombre_consultor,
    }));
  const handleConsultorChange = (newValue) => {
    setConsultor({ label: newValue.label, value: newValue.value });
  };

  //para poner dependencia entre los select estructuras
  const empresasOptions =
    empresas &&
    empresas.map((item) => ({
      value: item.idEmpresa,
      label: item.nombreEmpresa,
    }));
  const uebOptions =
    uebs &&
    uebs
      .filter((item) => (empresaId ? item.idEmpresa === empresaId : false))
      .map((item) => ({
        value: item.idUeb,
        label: item.nombreUeb,
      }));
  const handleEmpresaChange = (newValue) => {
    setEmpresa({ label: newValue.label, value: newValue.value });
    setUeb("");
    setSelectedStructure("");
    setSelectedArea("");
  };

  const structureOptions = direcciones
    .filter((item) => (uebId ? item.idUeb === uebId : false))
    .map((item) => ({
      value: item.idDireccion,
      label: item.nombreDireccion,
    }));
  const areaOptions = areas
    // .filter((item) =>
    //   // (ueb ? item.ueb === ueb.value : false) &&
    //   selectedStructure ? item.structure === selectedStructure.value : false
    // )
    .map((item) => ({
      value: item.idArea,
      label: item.nombreArea,
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
    value: item.idTrabajador,
    label: item.nombreTrabajador,
  }));

  const proyectosOptions = projects.map((item) => ({
    value: item.id_proyecto,
    label: item.nombre_proyecto,
  }));

  const defaultValues = {
    proyecto: proyecto,
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

  const [error, setError] = useState(null);
  async function createIntervencion(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/intervencion",
        updatedRow
      );
      if (response.status === 201) {
        // Actualiza el estado para añadir la nueva empresa al frontend
        setInterventions([...interventions, response.data]);
      } else {
        throw new Error("Error al crear la intervencion");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear la intervencion. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editIntervencion(id_intervencion, intervencionData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/intervencion/${id_intervencion}`,
        intervencionData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setInterventions(
          interventions.map((intervencion) =>
            intervencion.id_intervencion === id_intervencion ? response.data : intervencion
          ),
        );
        
      } else {
        throw new Error("Error al editar la intervencion");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar la intervencion. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      nombre_intervencion: data.name,
      descripcion: data.description,
      id_proyecto: parseInt(data.proyecto.value),
      id_area: parseInt(data.area.value),
      id_consultor: parseInt(data.consultor.value),
      id_trabajador: parseInt(data.worker.value),
      start_date: data.start,
      end_date: data.end,
    };
    // console.log(updatedRow)
    intervention
      ? editIntervencion(intervention.id_intervencion, updatedRow)
      : createIntervencion(updatedRow);
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
          <div className={styles.paddingSelect}>
            <Controller
              name="proyecto"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="proyecto"
                  {...field}
                  className={`${styles.selectFormRecInt} ${
                    errors.proyecto ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    setProyecto(selectedOption);
                    setValue("proyecto", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={proyectosOptions}
                  placeholder="Proyecto"
                />
              )}
            />
            {errors.proyecto && (
              <div className={styles.error}>Seleccione un proyecto.</div>
            )}

            <div className={styles.error}>{errors.intervention?.message}</div>
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
                    options={trabajadoresOptions}
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
                Fecha de inicio
              </InputLabel>

              <Input
                className={`${styles.inputForm}  ${
                  errors.start ? "is-invalid" : ""
                }`}
                type="date"
                id="start"
                {...register("start")}
                value={start}
                onChange={(event) => setStart(event.target.value)}
              />
              <div className={styles.error}>{errors.start?.message}</div>
            </div>
            <div>
              <InputLabel id="demo-simple-select-standard-label">
                Fecha de fin
              </InputLabel>
              <Input
                type="date"
                id="end"
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
