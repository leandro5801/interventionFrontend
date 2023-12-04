import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";

import UebCargarDatosTable from "../../Components/Tables/uebCargarDatosTable";

import datosUeb from "../../public/datosEmpresas.json";
export default function UEBPage() {
  // datos de las ueb
  const [direcciones, setDirecciones] = useState([]);
  const [uebs, setUebs] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  let filteredEmpresa = [];
  let filteredUeb = [];

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
    async function fetchUeb() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/ueb");
        setUebs(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchDireccion() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/direccion");
        setDirecciones(response.data);
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
    fetchUeb();
    fetchDireccion();
  }, []);

  if (empresas) {
    filteredEmpresa = empresas.filter(
      (empresa) => empresa.cargar_empresa === true
    );
    filteredUeb = uebs.filter((ueb) =>
      filteredEmpresa.find((empresa) => empresa.id_empresa === ueb.id_empresa)
    );
  }

  return (
    <div className={styles.title}>
      <h3>
        {" "}
        UEB
        <UebCargarDatosTable
          uebs={filteredUeb}
          setUebs={setUebs}
          empresas={filteredEmpresa}
          cargando={cargando}
          direcciones={direcciones}
        />
      </h3>
    </div>
  );
}
