import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";
import ProjectTable from "../../Components/Tables/ProjectTable";

import Container from "../../Components/Container";

import datosProyectos from "../../public/datosProyectos.json";
import datosUsers from "../../public/datosUsuarios.json";
export default function ProyectoPage() {
  // datos de los proyectos
  const [projects, setProjects] = useState(datosProyectos?.project);
  // datos de los usuarios
  const [users, setUsers] = useState(datosUsers?.users);
  //almacenando un listado de consultores
  const consultores = users.filter((user) => user.role_id === "2");

  return (
    <Container>
      <div className={styles.title}>
        <h3> Proyectos</h3>
        <ProjectTable
          projects={projects}
          setProjects={setProjects}
          consultores={consultores}
        />
      </div>
    </Container>
  );
}
