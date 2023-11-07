import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import DireccionTable from "../../Components/Tables/DireccionesTable";

import datosUeb from "../../public/datosEmpresas.json";
export default function DireccionPage() {
  // datos de las direcciones
  const [direcciones, setDirecciones] = useState(datosUeb?.direcciones);
  const [uebs, setUebs] = useState(datosUeb?.ueb);
  const [empresas, setEmpresas] = useState(datosUeb?.empresas);
  return (
    <div className={styles.title}>
      <h3> Direcciones</h3>
      <DireccionTable
        direcciones={direcciones}
        setDirecciones={setDirecciones}
        empresas={empresas}
        uebs={uebs}
      />
    </div>
  );
}
