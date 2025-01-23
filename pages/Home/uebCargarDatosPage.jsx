import React from "react";

import styles from "../../styles/Home.module.css";

import UebCargarDatosTable from "../../Components/Tables/uebCargarDatosTable";

import datosUeb from "../../public/datosEmpresas.json";
import { Typography } from "@mui/material";
import useUebCargar from "../../hooks/useUebCargar";
export default function UEBPage() {
  const { uebs, setUebs, empresas, cargando, direcciones } = useUebCargar();

  return (
    <div className={styles.title}>
      <Typography variant="h3">UEB</Typography>
      <UebCargarDatosTable
        uebs={uebs}
        setUebs={setUebs}
        empresas={empresas}
        cargando={cargando}
        direcciones={direcciones}
      />
    </div>
  );
}
