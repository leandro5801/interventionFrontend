import React from "react";

import styles from "../../styles/Home.module.css";

import EmpresaTable from "../../Components/Tables/EmpresaTable";
import { Typography } from "@mui/material";
import useEmpresaPage from "../../hooks/useEmpresaPage";
export default function EmpresaPage() {
  const { empresas, setEmpresas, cargando, error, uebs } = useEmpresaPage();
  return (
    <div className={styles.title}>
      <Typography variant="h3">Empresas</Typography>

      <EmpresaTable
        empresas={empresas}
        setEmpresas={setEmpresas}
        error={error}
        cargando={cargando}
        uebs={uebs}
      />
    </div>
  );
}
