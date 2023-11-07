import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import CargarDatosTable from "../../Components/Tables/CargarDatosTable";

import datosUeb from "../../public/datosEmpresas.json";
export default function CargarDatosPage() {
  // datos de las ueb
  const [trabajadores, setTrabajadores] = useState(datosUeb?.trabajadores);
  const [areas, setAreas] = useState(datosUeb?.areas);
  const [direcciones, setDirecciones] = useState(datosUeb?.direcciones);
  const [uebs, setUebs] = useState(datosUeb?.ueb);
  const [empresas, setEmpresas] = useState(datosUeb?.empresas);
  return (
    <div className={styles.title}>
      <h3>Datos de la Empresa</h3>
      <CargarDatosTable
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
