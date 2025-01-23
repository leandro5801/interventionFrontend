import React from "react";

import styles from "../../styles/Home.module.css";
import RecomendationTable from "../../Components/Tables/RecomendationTable";
import { Typography } from "@mui/material";
import useRecomendationPage from "../../hooks/useRecomendationsPage";

export default function RecomendacionPage() {
  const {
    filtredInterventions,
    filtredRecomendations,
    recomendations,
    setRecomendations,
    filtredProjects,
    consultorAutenticado,
    consultores,
    clasificaciones,
    cargando,
  } = useRecomendationPage();
  return cargando ? null : (
    <div className={styles.title}>
      <Typography variant="h3"> Recomendaciones</Typography>
      <RecomendationTable
        interventions={filtredInterventions}
        filtredRecomendations={filtredRecomendations}
        recomendations={recomendations}
        setRecomendations={setRecomendations}
        projects={filtredProjects}
        consultores={consultores}
        consultor={consultorAutenticado}
        clasificaciones={clasificaciones}
        cargando={cargando}
      />
    </div>
  );
}
