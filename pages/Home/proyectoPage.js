import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";
import ProjectTable from "../../Components/Tables/ProjectTable";

import Container from "../../Components/Container";

import datosProyectos from "../../public/datosProyectos.json";
export default function ProyectoPage() {
    // datos de los proyectos
    const [projects, setProjects] = useState(
      datosProyectos?.project
    );
  return (
    <Container>
      <div className={styles.title}>
        <h3> Proyectos</h3>
        <ProjectTable
            projects={projects}
            setProjects={setProjects}
          />
      </div>
    </Container>
  );
}
