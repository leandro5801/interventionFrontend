import React from "react";

import styles from "../../styles/Home.module.css";
import InterventionTable from "../../Components/Tables/InterventionTable";
import { Typography } from "@mui/material";
import useInterventionsPage from "../../hooks/useInterventionsPage";

export default function IntervencionPage() {
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
  } = useInterventionsPage();
  return (
    <div className={styles.title}>
      <Typography variant="h3" className={styles.tituloH3}>
        {" "}
        Intervenciones
      </Typography>
      <InterventionTable
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
