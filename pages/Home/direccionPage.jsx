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
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  let filteredEmpresa = [];
  let filteredUeb = [];
  let filteredDireccion = [];

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
    fetchEmpresa();
    fetchUeb();
    fetchDireccion();
    fetchArea();
  }, []);

  if (empresas) {
    filteredEmpresa = empresas.filter(
      (empresa) => empresa.cargar_empresa === false
    );
    filteredUeb = uebs.filter((ueb) =>
      filteredEmpresa.find((empresa) => empresa.id_empresa === ueb.id_empresa)
    );
    filteredDireccion = direcciones.filter((direccion) =>
      filteredUeb.find((ueb) => ueb.id_ueb === direccion.id_ueb)
    );
  }


  return (
    <div className={styles.title}>
      <h3> Direcciones</h3>
      <DireccionTable
        direcciones={filteredDireccion}
        setDirecciones={setDirecciones}
        empresas={filteredEmpresa}
        uebs={filteredUeb}
        cargando={cargando}
        areas={areas}
      />
    </div>
  );
}
