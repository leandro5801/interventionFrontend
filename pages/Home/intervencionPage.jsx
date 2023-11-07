import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";
import InterventionTable from "../../Components/Tables/InterventionTable";

import datosintervenciones from "../../public/datosintervenciones.json";
import datosProyectos from "../../public/datosProyectos.json"
import datosEmpresas from "../../public/datosEmpresas.json"


export default function IntervencionPage() {

    // datos de las intervenciones
    const [interventions, setInterventions] = useState(
      datosintervenciones?.tasks
    );
    const [recomendations, setRecomendations] = useState(
      datosintervenciones?.recomendations
    );
    const [projects, setProjects] = useState(
      datosProyectos?.project
    );
    const [empresas, setEmpresas] = useState(
      datosEmpresas?.empresas
    );
    const [uebs, setUebs] = useState(
      datosEmpresas?.ueb
    );
    const [direcciones, setDirecciones] = useState(
      datosEmpresas?.direcciones
    );
    const [areas, setAreas] = useState(
      datosEmpresas?.areas
    );
    const [trabajadores, setTrabajadores] = useState(
      datosEmpresas?.trabajadores
    );
  return (
      <div className={styles.title}>
        <h3 className={styles.tituloH3}> Intervenciones</h3>
        <InterventionTable
            interventions={interventions}
            setInterventions={setInterventions}
            projects={projects}
            empresas={empresas}
            uebs={uebs}
            direcciones={direcciones}
            areas={areas}
            trabajadores={trabajadores}
          />
      </div>
  );
}