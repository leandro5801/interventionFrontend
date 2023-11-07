import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import ReportTable from "../../Components/Tables/ReportTable";

import datosintervenciones from "../../public/datosintervenciones.json";
import datosProyectos from "../../public/datosProyectos.json";
export default function ReportePage() {
  const [interventions, setInterventions] = useState(
    datosintervenciones?.tasks
  );
  const [recomendations, setRecomendations] = useState(
    datosintervenciones?.recomendations
  );
  const [projects, setProjects] = useState(datosProyectos?.project);
  return (
    <div className={styles.title}>
      <h3> Reportes</h3>
      <ReportTable
        interventions={interventions}
        recomendations={recomendations}
        setRecomendations={setRecomendations}
        projects={projects}
      />
    </div>
  );
}
