import React from "react";

import styles from "../../styles/Home.module.css";
import AreaTable from "../../Components/Tables/AreaTable";
import { Typography } from "@mui/material";
import useAreaPage from "../../hooks/useAreaPage";

export default function AreaPage() {
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
  } = useAreaPage();
  return (
    <div className={styles.title}>
      <Typography variant="h3"> Áreas</Typography>{" "}
      <AreaTable
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
