import React from "react";

import styles from "../../styles/Home.module.css";
import ProjectCargarDatosTable from "../../Components/Tables/ProjectCargarDatosTable";
import { Typography } from "@mui/material";
import useProjectsCargarPage from "../../hooks/useProyectoCargar";

export default function ProyectoCargarDatosPage() {
  const {
    projects,
    setProjects,
    consultores,
    clientes,
    cargando,
    interventions,
  } = useProjectsCargarPage();
  return cargando ? null : (
    <div className={styles.title}>
      <Typography variant="h3"> Proyectos</Typography>
      <ProjectCargarDatosTable
        projects={projects}
        setProjects={setProjects}
        consultores={consultores}
        clientes={clientes}
        cargando={cargando}
        interventions={interventions}
      />
    </div>
  );
}
