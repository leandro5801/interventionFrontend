import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import TrabajadorTable from "../../Components/Tables/TrabajadorTable";

import datosUeb from "../../public/datosEmpresas.json";
export default function TrabajadorPage() {
  // datos de las ueb
  const [trabajadores, setTrabajadores] = useState(datosUeb?.trabajadores);
  const [areas, setAreas] = useState(datosUeb?.areas);
  const [direcciones, setDirecciones] = useState(datosUeb?.direcciones);
  const [uebs, setUebs] = useState(datosUeb?.ueb);
  const [empresas, setEmpresas] = useState(datosUeb?.empresas);
  return (
    <div className={styles.title}>
      <h3>Trabajadores</h3>
      <TrabajadorTable
        trabajadores={trabajadores}
        setTrabajadores={setTrabajadores}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        areas={areas}
      />
    </div>
  );
}
