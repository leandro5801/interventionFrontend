import React from "react";

import styles from "../../styles/Home.module.css";
import TrabajadorCargarDatosTable from "../../Components/Tables/TrabajadorCargarDatosTable";
import { Typography } from "@mui/material";
import useTrabajadoresCargar from "../../hooks/useTrabajadoresCargar";

export default function TrabajadorPage() {
  const {
    trabajadores,
    setTrabajadores,
    empresas,
    uebs,
    direcciones,
    areas,
    cargando,
  } = useTrabajadoresCargar(); // Use the custom hook

  return (
    <div className={styles.title}>
      <Typography variant="h3">Trabajadores</Typography>
      <TrabajadorCargarDatosTable
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
