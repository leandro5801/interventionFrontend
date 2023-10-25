import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import ReportTable from "../../Components/Tables/ReportTable"

import datosintervenciones from "../../public/datosintervenciones.json";
export default function ReportePage() {
  const [interventions, setInterventions] = useState(
    datosintervenciones?.tasks
  );
  const [recomendations, setRecomendations] = useState(
    datosintervenciones?.recomendations
  );
  return (

    <Container>
      <div className={styles.title}>
        <h3> Reportes</h3>
        <ReportTable
          interventions={interventions}
          recomendations={recomendations}
          setRecomendations={setRecomendations}
        />
      </div>
    </Container>
  );
}
