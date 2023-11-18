import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";

import EmpresaTable from "../../Components/Tables/EmpresaTable";
export default function EmpresaPage() {
  // datos de las empresas
  // const [empresas, setEmpresas] = useState(datosEmpresas?.empresas);
  const [empresas, setEmpresas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  
  useEffect(() => {
    async function fetchEmpresa() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/empresa");
        setEmpresas(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    fetchEmpresa();
  }, []);

  return (
    <div className={styles.title}>
      <h3>Empresas</h3>
      <EmpresaTable
        empresas={empresas}
        setEmpresas={setEmpresas}
        error={error}
        cargando={cargando}
      />
    </div>
  );
}
