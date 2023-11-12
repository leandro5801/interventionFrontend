import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


import styles from "../../styles/Home.module.css";

import UebTable from "../../Components/Tables/UebTable";

import datosUeb from "../../public/datosEmpresas.json";
export default function UEBPage() {
  // datos de las ueb
  const [uebs, setUebs] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function fetchEmpresa() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/empresa');
        setEmpresas(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchUeb() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/ueb');
        setUebs(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    fetchEmpresa();
    fetchUeb();
  }, []);
  return (
    <div className={styles.title}>
      <h3>
        {" "}
        UEBs
        <UebTable uebs={uebs} setUebs={setUebs} empresas={empresas} cargando={cargando}/>
      </h3>
    </div>
  );
}
