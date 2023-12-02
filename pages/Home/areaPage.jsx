import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import AreaTable from "../../Components/Tables/AreaTable";

export default function AreaPage() {
  // datos de las areas
  const [areas, setAreas] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [uebs, setUebs] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
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
    async function fetchArea() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/area');
        setAreas(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchTrabajador() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/trabajador');
        setTrabajadores(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    fetchTrabajador();
    fetchEmpresa();
    fetchUeb();
    fetchDireccion();
    fetchArea();
  }, []);
  return (
    <div className={styles.title}>
      <h3> Áreas</h3>
      <AreaTable
        areas={areas}
        setAreas={setAreas}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        cargando={cargando}
        trabajadores={trabajadores}
      />
    </div>
  );
}
