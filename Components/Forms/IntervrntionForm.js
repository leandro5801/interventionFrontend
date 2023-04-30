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
}) {
  const [name, setName] = useState(intervention ? intervention.name : null);
  const [description, setDescription] = useState(
    intervention ? intervention.description : null
  );
  const [selectedProcess, setSelectedProcess] = useState(
    intervention
      ? { label: intervention.process, value: intervention.process }
      : null
  );
  const [selectedUeb, setSelectedUeb] = useState(
    intervention ? { label: intervention.ueb, value: intervention.ueb } : null
  );
  const [selectedStructure, setSelectedStructure] = useState(
    intervention
      ? { label: intervention.structure, value: intervention.structure }
      : null
  );
  const [selectedArea, setSelectedArea] = useState(
    intervention ? { label: intervention.area, value: intervention.area } : null
  );
  const [consultor, setConsultor] = useState(
    intervention
      ? {
          label: intervention.consultor,
          value: intervention.consultor,
        }
      : null
  );
  const [worker, setWorker] = useState(
    intervention ? intervention.worker : null
  );
  const [start, setStart] = useState(intervention ? intervention.start : null);
  const [end, setEnd] = useState(intervention ? intervention.end : null);

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
      worker,
      start,
      end,
    };

    setInterventions(
      intervention ? updatedRow : (prevData) => [...prevData, updatedRow]
    );
    onSave();
    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  };

  // Cargando los datos de los procesos, las ueb y las estructuras
  const [process, setProcess] = useState(null);
  useEffect(() => {
    client("procesos.json").then(
      (procesos) => {
        setProcess(procesos?.process);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className={styles.formTitle}>Intervención</h2>
        <div>
          <label htmlFor="name">Intervención:</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            className={styles.input}
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="ueb">UEB:</label>
          <Select
            value={selectedUeb}
            onChange={handleUebChange}
            options={uebOptions}
            placeholder="Seleccione..."
          />
        </div>
        <div>
          <label htmlFor="sructure">Departamento/Dirección:</label>
          <Select
            value={selectedStructure}
            onChange={handleStructureChange}
            options={structureOptions}
            placeholder="Seleccione..."
          />
        </div>
        <div>
          <label htmlFor="area">Área:</label>
          <Select
            value={selectedArea}
            onChange={setSelectedArea}
            options={areaOptions}
            placeholder="Seleccione..."
          />
        </div>

        <div>
          <label htmlFor="process">Proceso:</label>
          <Select
            value={selectedProcess}
            onChange={setSelectedProcess}
            options={
              process &&
              process.map((sup) => ({ label: sup.label, value: sup.label }))
            }
            placeholder="Seleccione..."
          />
        </div>

        <div>
          <label htmlFor="consultor">Consultor:</label>
          <Select
            value={consultor}
            onChange={handleConsultorChange}
            options={consultoresOptions}
            placeholder="Seleccione..."
          />
        </div>

        <div>
          <label htmlFor="worker">Trabajador:</label>
          <input
            className={styles.input}
            type="text"
            id="worker"
            value={worker}
            onChange={(event) => setWorker(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="start">Fecha de inicio:</label>
          <input
            className={styles.input}
            type="date"
            id="start"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end">Fecha de Fin:</label>
          <input
            className={styles.input}
            type="date"
            id="end"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </div>
      </div>

      <button className={styles.btn} type="submit">
        Aceptar
      </button>
      <button className={styles.btn} type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
