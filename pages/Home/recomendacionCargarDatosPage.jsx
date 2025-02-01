import React from "react";

import styles from "../../styles/Home.module.css";
import RecomendationCargarDatosTable from "../../Components/Tables/RecomendationCargarDatosTable";
import { Typography } from "@mui/material";
import useRecomendationCargarDatosPage from "../../hooks/useRecomendationCargarDatosPage";

export default function RecomendaciónCargarDatosPage() {
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
  } = useRecomendationCargarDatosPage();
  return cargando ? null : (
    <div className={styles.title}>
      <Typography variant="h3"> Recomendaciones</Typography>
      <RecomendationCargarDatosTable
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
