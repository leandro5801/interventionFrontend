import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import TrabajadorTable from "../../Components/Tables/TrabajadorTable";
import { Typography } from "@mui/material";
import useTrabajadoresPage from "../../hooks/useTrabajadoresPage";

export default function TrabajadorPage() {
  const {
    trabajadores,
    setTrabajadores,
    empresas,
    uebs,
    direcciones,
    areas,
    cargando,
  } = useTrabajadoresPage();

  return (
    <div className={styles.title}>
      <Typography variant="h3">Trabajadores</Typography>
      <TrabajadorTable
        trabajadores={trabajadores}
        setTrabajadores={setTrabajadores}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        areas={areas}
        cargando={cargando}
      />
    </div>
  );
}
