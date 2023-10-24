import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import RecomendationTable from "../../Components/Tables/RecomendationTable";

import datosintervenciones from "../../public/datosintervenciones.json";
export default function RecomendacionPage() {
  const [interventions, setInterventions] = useState(
    datosintervenciones?.tasks
  );
  const [recomendations, setRecomendations] = useState(
    datosintervenciones?.recomendations
  );
  return (
    <Container>
      <div className={styles.title}>
        <h3> Recomendaciones</h3>
        <RecomendationTable
          interventions={interventions}
          tableRData={recomendations}
          setRecomendations={setRecomendations}
        />
      </div>
    </Container>
  );
}
