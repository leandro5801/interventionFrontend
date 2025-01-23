import React from "react";

import styles from "../../styles/Home.module.css";

import DireccionCargarDatosTable from "../../Components/Tables/DireccionesCargarDatosTable";
import { Typography } from "@mui/material";
import useDireccionesCargar from "../../hooks/useDireccionesCargar";

export default function DireccionPage() {
  const { direcciones, uebs, empresas, cargando, setDirecciones, areas } =
    useDireccionesCargar();
  return (
    <div className={styles.title}>
      <Typography variant="h3"> Direcciones</Typography>
      <DireccionCargarDatosTable
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
