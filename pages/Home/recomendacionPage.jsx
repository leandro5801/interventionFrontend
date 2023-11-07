import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";
import RecomendationTable from "../../Components/Tables/RecomendationTable";

import datosintervenciones from "../../public/datosintervenciones.json";
import datosProyectos from "../../public/datosProyectos.json";
export default function RecomendacionPage() {
  const [interventions, setInterventions] = useState(
    datosintervenciones?.tasks
  );
  const [recomendations, setRecomendations] = useState(
    datosintervenciones?.recomendations
  );
  const [projects, setProjects] = useState(datosProyectos?.project);
  return (
    <div className={styles.title}>
      <h3> Recomendaciones</h3>
      <RecomendationTable
        interventions={interventions}
        recomendations={recomendations}
        setRecomendations={setRecomendations}
        projects={projects}
      />
    </div>
  );
}
