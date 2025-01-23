import React from "react";

import styles from "../../styles/Home.module.css";

import UebTable from "../../Components/Tables/UebTable";

import datosUeb from "../../public/datosEmpresas.json";
import { Typography } from "@mui/material";
import useUebPage from "../../hooks/useUebPage";
export default function UEBPage() {
  const { uebs, setUebs, empresas, cargando, direcciones } = useUebPage();

  return (
    <div className={styles.title}>
      <Typography variant="h3">
        {" "}
        UEB
        <UebTable
          uebs={uebs}
          setUebs={setUebs}
          empresas={empresas}
          cargando={cargando}
          direcciones={direcciones}
        />
      </Typography>
    </div>
  );
}
