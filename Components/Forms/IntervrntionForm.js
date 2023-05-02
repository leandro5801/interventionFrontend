import styles from "../../styles/Home.module.css";
import Select from "react-select";
import { client } from "../../utils/fetchWrapper";
import data from "../../public/structure.json";

import { useState, useEffect } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormik } from "formik";
import { validationSchema } from "../../validations/validationI";
import * as Yup from "yup";

export default function FormUpdateIntervention({
  setInterventions,
  interventions,
  intervention,
  interventionUpdate,
  onCancel,
  onSave,
  consultores,
  process,
  trabDirProdCit,
  trabDirProdLior,
  trabDireccionLior,
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
    intervention ? { label: intervention.ueb , value:intervention.ueb}: ""
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
  const [worker, setWorker] = useState(intervention ? intervention.worker : "");
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
  }

  // form validation rules
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, setValue, handleSubmit, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    const updatedRow = {
      id: intervention ? intervention.id : interventions.length + 1,
      name: data.name,
      description: data.description,
      process: data.process,
      ueb: data.ueb,
      structure: data.structure,
      area: data.area,
      consultor: data.consultor,
      worker: data.worker,
      start: data.start,
      end: data.end,
    };

    setInterventions(
      intervention ? updatedRow : (prevData) => [...prevData, updatedRow]
    );
    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  }

  return (
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
          <Select
            id="ueb"
            {...register("ueb")}
            className={`${styles.selectForm}  ${
              errors.ueb ? "is-invalid" : ""
            }`}
            value={selectedUeb}
            getOptionValue={(option) => option.value}
            defaultValue={selectedUeb}
            onChange={(selectedOption) => {
              handleUebChange(selectedOption);
              setValue("ueb", selectedOption.label);
            }}
            options={uebOptions}
            placeholder="Seleccione..."
          />
        </div>
        <div className={styles.error}>{errors.ueb?.message}</div>
        <div className={styles.halfRow}>
          <label htmlFor="sructure">Departamento/Dirección:</label>
          <Select
            id="sructure"
            {...register("sructure")}
            className={`${styles.selectForm}  ${
              errors.structure ? "is-invalid" : ""
            }`}
            value={selectedStructure}
            onChange={(selectedOption) => {
              handleStructureChange(selectedOption);
              setValue("structure", selectedOption.label);
            }}
            options={structureOptions}
            placeholder="Seleccione..."
          />
          <div className={styles.error}>{errors.structure?.message}</div>
        </div>
        <div className={styles.halfRow}>
          <label htmlFor="area">Área:</label>
          <Select
            id="area"
            {...register("area")}
            className={`${styles.selectForm}  ${
              errors.area ? "is-invalid" : ""
            }`}
            value={selectedArea}
            onChange={(selectedOption) => {
              setSelectedArea(selectedOption);
              setValue("area", selectedOption.label);
            }}
            options={areaOptions}
            placeholder="Seleccione..."
          />
          <div className={styles.error}>{errors.area?.message}</div>
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="process">Proceso:</label>
          <Select
            id="process"
            {...register("process")}
            className={`${styles.selectForm}  ${
              errors.process ? "is-invalid" : ""
            }`}
            value={selectedProcess}
            onChange={(selectedOption) => {
              setSelectedProcess(selectedOption);
              setValue("process", selectedOption.label);
            }}
            options={
              process &&
              process.map((sup) => ({ label: sup.label, value: sup.label }))
            }
            placeholder="Seleccione..."
          />
          {errors.process && (
            <div className={styles.error}>{errors.process.message}</div>
          )}
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="consultor">Consultor:</label>
          <Select
            id="consultor"
            {...register("consultor")}
            className={`${styles.selectForm}  ${
              errors.consultor ? "is-invalid" : ""
            }`}
            value={consultor}
            onChange={(selectedOption) => {
              handleConsultorChange(selectedOption);
              setValue("consultor", selectedOption.label);
            }}
            options={consultoresOptions}
            placeholder="Seleccione..."
          />
          <div className={styles.error}>{errors.consultor?.message}</div>
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="worker">Trabajador:</label>
          <Select
            id="worker"
            {...register("worker")}
            className={`${styles.selectForm}  ${
              errors.worker ? "is-invalid" : ""
            }`}
            value={selectedTrabajador}
            onChange={(selectedOption) => {
              setSelectedTrabajador(selectedOption);
              setValue("worker", selectedOption.label);
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
          <div className={styles.error}>{errors.worker?.message}</div>
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
        <button className={styles.btn} type="button" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </form>
  );
}
