import React from "react";

import styles from "../../styles/Home.module.css";

import ConsultorTable from "../../Components/Tables/ConsultorTable";

import datosUsuarios from "../../public/datosUsuarios.json";
import { Typography } from "@mui/material";
import useConsultorPage from "../../hooks/useConsultorPage";

export default function ConsultorPage() {
  const { consultores, setConsultores, users, setUsers, projects, cargando } =
    useConsultorPage();
  return (
    <div className={styles.title}>
      <Typography variant="h3">Consultores</Typography>
      <ConsultorTable
        consultores={consultores}
        setConsultores={setConsultores}
        users={users}
        setUsers={setUsers}
        cargando={cargando}
        projects={projects}
      />
    </div>
  );
}
