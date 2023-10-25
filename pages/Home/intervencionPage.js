import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import InterventionTable from "../../Components/Tables/InterventionTable";

import datosintervenciones from "../../public/datosintervenciones.json";
import trabDirProdCitt from "../../public/DirTecProdCit.json";
export default function IntervencionPage() {

    // datos de las intervenciones
    const [interventions, setInterventions] = useState(
      datosintervenciones?.tasks
    );
    const [recomendations, setRecomendations] = useState(
      datosintervenciones?.recomendations
    );
    //trabajadores
  const [trabDirProdCit, setTrabDirProdCit] = useState(trabDirProdCitt?.Trabajadores);
 


  return (
    <Container>
      <div className={styles.title}>
        <h3 className={styles.tituloH3}> Intervenciones</h3>
        <InterventionTable
            interventions={interventions}
            setInterventions={setInterventions}
            trabDirProdCit={trabDirProdCit}
          />
      </div>
    </Container>
  );
}