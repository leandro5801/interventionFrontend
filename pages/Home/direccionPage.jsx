import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";

import DireccionTable from "../../Components/Tables/DireccionesTable";
import { Typography } from "@mui/material";
import useDireccionesPage from "../../hooks/useDireccionesPage";

export default function DireccionPage() {
  const { direcciones, uebs, empresas, cargando, setDirecciones, areas } =
    useDireccionesPage();

  return (
    <div className={styles.title}>
      <Typography variant="h3"> Direcciones</Typography>
      <DireccionTable
        direcciones={direcciones}
        setDirecciones={setDirecciones}
        empresas={empresas}
        uebs={uebs}
        cargando={cargando}
        areas={areas}
      />
    </div>
  );
}
