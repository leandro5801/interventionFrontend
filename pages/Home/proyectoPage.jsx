import React from "react";

import styles from "../../styles/Home.module.css";
import ProjectTable from "../../Components/Tables/ProjectTable";
import { Typography } from "@mui/material";
import useProjectsPage from "../../hooks/useProjectsPage";

export default function ProyectoPage() {
  const {
    projects,
    setProjects,
    consultores,
    clientes,
    cargando,
    interventions,
  } = useProjectsPage();
  return cargando ? null : (
    <div className={styles.title}>
      <Typography variant="h3"> Proyectos</Typography>
      <ProjectTable
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
