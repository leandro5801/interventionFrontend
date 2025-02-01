import React from "react";

import styles from "../../styles/Home.module.css";
import { Typography } from "@mui/material";
import useInterventionsCargarDatosPage from "../../hooks/useInterventionCargarDatosPage";
import InterventionCargarDatosTable from "../../Components/Tables/InterventionCargarDatosTable";

export default function InterventionCargarDatosPage() {
  const {
    filteredInterventions,
    interventions,
    setInterventions,
    filteredProjects,
    empresas,
    uebs,
    direcciones,
    areas,
    trabajadores,
    consultores,
    recomendations,
    consultorAutenticado,
  } = useInterventionsCargarDatosPage();
  return (
    <div className={styles.title}>
      <Typography variant="h3" className={styles.tituloH3}>
        {" "}
        Intervenciones
      </Typography>
      <InterventionCargarDatosTable
        filteredInterventions={filteredInterventions}
        interventions={interventions}
        setInterventions={setInterventions}
        projects={filteredProjects}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        areas={areas}
        trabajadores={trabajadores}
        consultores={consultores}
        consultor={consultorAutenticado}
        recomendations={recomendations}
      />
    </div>
  );
}
