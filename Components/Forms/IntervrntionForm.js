import styles from "../../styles/Home.module.css";
import Select from "react-select";
import { client } from "../../utils/fetchWrapper";
import data from "../../public/structure.json";

import { useState, useEffect } from "react";

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
  const [worker, setWorker] = useState(intervention ? intervention.worker : "");
  const [start, setStart] = useState(intervention ? intervention.start : "");
  const [end, setEnd] = useState(intervention ? intervention.end : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crea un objeto con los datos actualizados de la fila
    const updatedRow = {
      id: intervention ? intervention.id : interventions.length + 1,
      name,
      description,
      process: selectedProcess.value,
      ueb: selectedUeb.value,
      structure: selectedStructure.value,
      area: selectedArea.value,
      consultor: consultor.value,
      worker: selectedTrabajador.value,
      start,
      end,
    };

    setInterventions(
      intervention ? updatedRow : (prevData) => [...prevData, updatedRow]
    );
    onSave();
    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  };

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
    setSelectedStructure(null);
    setSelectedArea(null);
  };
  const handleStructureChange = (newValue) => {
    setSelectedStructure(newValue);
    setSelectedArea(null);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <h2 className={styles.formTitle}>Intervención</h2>
        <div className={styles.fullRow}>
          <label htmlFor="name">Intervención:</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.fullRow}>
          <label htmlFor="description">Descripción:</label>
          <input
            className={styles.input}
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="ueb">UEB:</label>
          <Select
            className={styles.selectForm}
            value={selectedUeb}
            onChange={handleUebChange}
            options={uebOptions}
            placeholder="Seleccione..."
          />
        </div>
        <div className={styles.halfRow}>
          <label htmlFor="sructure">Departamento/Dirección:</label>
          <Select
          className={styles.selectForm}
            value={selectedStructure}
            onChange={handleStructureChange}
            options={structureOptions}
            placeholder="Seleccione..."
          />
        </div>
        <div className={styles.halfRow}>
          <label htmlFor="area">Área:</label>
          <Select
          className={styles.selectForm}
            value={selectedArea}
            onChange={setSelectedArea}
            options={areaOptions}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="process">Proceso:</label>
          <Select
          className={styles.selectForm}
            value={selectedProcess}
            onChange={setSelectedProcess}
            options={
              process &&
              process.map((sup) => ({ label: sup.label, value: sup.label }))
            }
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="consultor">Consultor:</label>
          <Select
          className={styles.selectForm}
            value={consultor}
            onChange={handleConsultorChange}
            options={consultoresOptions}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="worker">Trabajador:</label>
          <Select
          className={styles.selectForm}
            value={selectedTrabajador}
            onChange={setSelectedTrabajador}
            options={
              trabajadoresOptions &&
              trabajadoresOptions.map((sup) => ({
                label: sup.label,
                value: sup.label,
              }))
            }
            placeholder="Seleccione..."
          />
        </div>
        <div className={styles.halfRow}>
          <label htmlFor="start">Fecha de inicio:</label>
          <input
            className={styles.inputFecha}
            type="date"
            id="start"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </div>
        <div className={styles.halfRow}>
          <label htmlFor="end">Fecha de Fin:</label>
          <input
            className={styles.inputFecha}
            type="date"
            id="end"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.formButtons }>
        <button className={styles.btn } type="submit">
          Aceptar
        </button>

        <button className={styles.btn} type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
