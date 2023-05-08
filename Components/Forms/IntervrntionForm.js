import styles from "../../styles/Home.module.css";
import Select from "react-select";
import data from "../../public/structure.json";

import { useState} from "react";

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
} from "@material-ui/core";

export default function FormUpdateIntervention({
  setInterventions,
  interventions,
  intervention,
  onCancel,
  onSave,
  consultores,
  process,
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
  const [selectedProcess, setSelectedProcess] = useState(
    intervention
      ? { label: intervention.process, value: intervention.process }
      : ""
  );
  const [selectedTrabajador, setSelectedTrabajador] = useState(
    intervention
      ? { label: intervention.worker, value: intervention.worker }
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
  let trabajadoresOptions = [];
  if (
    selectedUeb &&
    selectedUeb.value === "CITOSTÁTICOS" &&
    selectedStructure &&
    selectedStructure.value === "Dirección Técnico Productiva"
  ) {
    trabajadoresOptions =
      trabDirProdCit &&
      trabDirProdCit
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "CITOSTÁTICOS" &&
    selectedStructure &&
    selectedStructure.value === "Departamento de Calidad"
  ) {
    trabajadoresOptions =
      trabCalidadCit &&
      trabCalidadCit
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "CITOSTÁTICOS" &&
    selectedStructure &&
    selectedStructure.value === "Departamento de Direción"
  ) {
    trabajadoresOptions =
      trabDireccionCit &&
      trabDireccionCit
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "LIORAD" &&
    selectedStructure &&
    selectedStructure.value === "Dirección Técnico Productiva"
  ) {
    trabajadoresOptions =
      trabDirProdLior &&
      trabDirProdLior
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "LIORAD" &&
    selectedStructure &&
    selectedStructure.value === "Departamento de Direción"
  ) {
    trabajadoresOptions =
      trabDireccionLior &&
      trabDireccionLior
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "LIORAD" &&
    selectedStructure &&
    selectedStructure.value === "Departamento de Calidad"
  ) {
    trabajadoresOptions =
      trabCalidadLior &&
      trabCalidadLior
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "AICA" &&
    selectedStructure &&
    selectedStructure.value === "Dirección Técnico Productiva"
  ) {
    trabajadoresOptions =
      trabDirProdAica &&
      trabDirProdAica
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "SH+" &&
    selectedStructure &&
    selectedStructure.value === "Departamento de Calidad"
  ) {
    trabajadoresOptions =
      trabCalidadSh &&
      trabCalidadSh
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "SH+" &&
    selectedStructure &&
    selectedStructure.value === "Departamento de Direción"
  ) {
    trabajadoresOptions =
      trabDireccionSh &&
      trabDireccionSh
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  } else if (
    selectedUeb &&
    selectedUeb.value === "JULIO TRIGO" &&
    selectedStructure &&
    selectedStructure.value === "Dirección Técnico Productiva"
  ) {
    trabajadoresOptions =
      trabDirProdJt &&
      trabDirProdJt
        .filter((item) =>
          selectedArea ? item.Area === selectedArea.value : false
        )
        .map((item) => ({
          value: item.Nombre,
          label: item.Nombre,
        }));
  }

  const defaultValues = {
    ueb: selectedUeb,
    structure: selectedStructure,
    area: selectedArea,
    consultor: consultor,
    process: selectedProcess,
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
      process: data.process.value,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGrid}>
          <h2 className={styles.formTitle}>Intervención</h2>
          <div className={styles.fullRow}>
            <label htmlFor="name">Intervención:</label>
            <input
              className={`${styles.input}  ${errors.name ? "is-invalid" : ""}`}
              type="text"
              id="name"
              {...register("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <div className={styles.error}>{errors.name?.message}</div>
          </div>
          <div className={styles.fullRow}>
            <label htmlFor="description">Descripción:</label>
            <input
              className={`${styles.input}  ${
                errors.description ? "is-invalid" : ""
              }`}
              type="text"
              id="description"
              {...register("description")}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className={styles.error}>{errors.description?.message}</div>
          </div>

          <div className={styles.halfRow}>
            <label htmlFor="ueb">UEB:</label>
            <Controller
              name="ueb"
              control={control}
              render={({ field }) => (
                <Select
                  id="ueb"
                  {...field}
                  className={`${styles.selectForm}  ${
                    errors.ueb ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleUebChange(selectedOption);
                    setValue("ueb", selectedOption);
                    setValue("structure", "");
                    setValue("area", "");
                    setValue("worker", "");
                    field.onChange(selectedOption);
                  }}
                  options={uebOptions}
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.ueb && (
              <div className={styles.error}>Seleccione una UEB.</div>
            )}
          </div>

          <div className={styles.halfRow}>
            <label htmlFor="structure">Departamento/Dirección:</label>
            <Controller
              name="structure"
              control={control}
              render={({ field }) => (
                <Select
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
                  placeholder="Seleccione..."
                />
              )}
            />

            {errors.structure && (
              <div className={styles.error}>Seleccione una Dirección.</div>
            )}
          </div>
          <div className={styles.halfRow}>
            <label htmlFor="area">Área:</label>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select
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
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.area && (
              <div className={styles.error}>Seleccione un Área.</div>
            )}
          </div>

          <div className={styles.halfRow}>
            <label htmlFor="process">Proceso:</label>
            <Controller
              name="process"
              control={control}
              render={({ field }) => (
                <Select
                  id="process"
                  {...field}
                  className={`${styles.selectForm}  ${
                    errors.process ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    setSelectedProcess(selectedOption);
                    setValue("process", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={
                    process &&
                    process.map((sup) => ({
                      label: sup.label,
                      value: sup.label,
                    }))
                  }
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.process && (
              <div className={styles.error}>Seleccione un Proceso.</div>
            )}
          </div>

          <div className={styles.halfRow}>
            <label htmlFor="consultor">Consultor:</label>
            <Controller
              name="consultor"
              control={control}
              render={({ field }) => (
                <Select
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
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.consultor && (
              <div className={styles.error}>Seleccione un Consultor.</div>
            )}
          </div>

          <div className={styles.halfRow}>
            <label htmlFor="worker">Trabajador:</label>
            <Controller
              name="worker"
              control={control}
              render={({ field }) => (
                <Select
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
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.worker && (
              <div className={styles.error}>Seleccione un Trabajador.</div>
            )}
          </div>
          <div className={styles.halfRow}>
            <label htmlFor="start">Fecha de inicio:</label>
            <input
              type="date"
              id="start"
              {...register("start")}
              className={`${styles.inputFecha}  ${
                errors.start ? "is-invalid" : ""
              }`}
              value={start}
              onChange={(event) => setStart(event.target.value)}
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
                errors.process ? "is-invalid" : ""
              }`}
              value={end}
              onChange={(event) => setEnd(event.target.value)}
            />
            <div className={styles.error}>{errors.end?.message}</div>
          </div>
        </div>
        <div className={styles.formButtons}>
          <button className={styles.btn} type="submit">
            Aceptar
          </button>

          <button className={styles.btn} type="button" onClick={onCancel}>
            Cancelar
          </button>
          {/* <button className={styles.btn} type="button" onClick={() => reset()}>
          Reset
        </button> */}
        </div>

        <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
          <DialogTitle>{type === "crear" ? "Confirmar creación" : "Confirmar modificación"}</DialogTitle>
          <DialogContent>
            <p>{type === "crear" ? "¿Está seguro de crear esta intervención?" : "¿Está seguro de modificar esta intervención?"}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={() => handleConfirm(formData)}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
