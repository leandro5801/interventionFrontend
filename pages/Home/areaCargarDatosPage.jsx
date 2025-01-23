import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import AreaCargarDatosTable from "../../Components/Tables/AreaCargarDatosTable";
import { Typography } from "@mui/material";
import useAreaCargarDatosPage from "../../hooks/useAreaCargarDatosPage";

export default function AreaCargarDatosPage() {
  const {
    setAreas,
    areas,
    empresas,
    uebs,
    direcciones,
    trabajadores,
    cargando,
    uebPorId,
    direccionPorId,
    nombreEmpresa,
    nombreUeb,
    nombreDireccion,
  } = useAreaCargarDatosPage(); //
  return (
    <div className={styles.title}>
      <Typography variant="h3"> Áreas</Typography>
      <AreaCargarDatosTable
        areas={areas}
        setAreas={setAreas}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        cargando={cargando}
        trabajadores={trabajadores}
        uebPorId={uebPorId}
        direccionPorId={direccionPorId}
        nombreEmpresa={nombreEmpresa}
        nombreUeb={nombreUeb}
        nombreDireccion={nombreDireccion}
      />
    </div>
  );
}
