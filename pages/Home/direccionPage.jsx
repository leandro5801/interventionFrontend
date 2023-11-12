import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";

import DireccionTable from "../../Components/Tables/DireccionesTable";

export default function DireccionPage() {
  // datos de las direcciones
  const [direcciones, setDirecciones] = useState([]);
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
    async function fetchDireccion() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/direccion');
        setDirecciones(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    fetchEmpresa();
    fetchUeb();
    fetchDireccion();
  }, []);
  return (
    <div className={styles.title}>
      <h3> Direcciones</h3>
      <DireccionTable
        direcciones={direcciones}
        setDirecciones={setDirecciones}
        empresas={empresas}
        uebs={uebs}
        cargando={cargando}
      />
    </div>
  );
}
