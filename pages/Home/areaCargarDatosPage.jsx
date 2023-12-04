import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import AreaCargarDatosTable from "../../Components/Tables/AreaCargarDatosTable";

export default function AreaCargarDatosPage() {
  // datos de las areas
  const [areas, setAreas] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [uebs, setUebs] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  let filteredEmpresa = [];
  let filteredUeb = [];
  let filteredDireccion = [];
  let filteredArea = [];

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
    async function fetchArea() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/area");
        setAreas(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchTrabajador() {
      setCargando(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/trabajador"
        );
        setTrabajadores(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
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
  // ---------------------------------------------------------
  //para retornar el nombre de la empresa y no el id
  const uebPorId = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    if (!ueb) {
      console.error(`No se encontró ninguna UEB con id_ueb: ${id_ueb}`);
      return;
    }
    return ueb;
  };
  const direccionPorId = (id_direccion) => {
    const direccion = direcciones.find((e) => e.id_direccion === id_direccion);
    return direccion;
  };
  const nombreEmpresa = (id_empresa) => {
    const empresa = empresas.find((e) => e.id_empresa === id_empresa);
    const name = empresa ? empresa.nombre_empresa : "no se encontro el nombre";
    return name;
  };
  const nombreUeb = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    const name = ueb ? ueb.nombre_ueb : "no se encontro el nombre";
    return name;
  };
  const nombreDireccion = (id_direccion) => {
    const direccion = direcciones.find((e) => e.id_direccion === id_direccion);
    const name = direccion
      ? direccion.nombre_direccion
      : "no se encontro el nombre";
    return name;
  };
  // ---------------------------------------------------------

  if (empresas) {
    filteredEmpresa = empresas.filter(
      (empresa) => empresa.cargar_empresa === true
    );
    filteredUeb = uebs.filter((ueb) =>
      filteredEmpresa.find((empresa) => empresa.id_empresa === ueb.id_empresa)
    );
    filteredDireccion = direcciones.filter((direccion) =>
      filteredUeb.find((ueb) => ueb.id_ueb === direccion.id_ueb)
    );
    filteredArea = areas.filter((area) =>
      filteredDireccion.find(
        (direccion) => direccion.id_direccion === area.id_direccion
      )
    );
  }

  return (
    <div className={styles.title}>
      <h3> Áreas</h3>
      <AreaCargarDatosTable
        areas={filteredArea}
        setAreas={setAreas}
        empresas={filteredEmpresa}
        uebs={filteredUeb}
        direcciones={filteredDireccion}
        cargando={cargando}
        trabajadores={trabajadores}
        uebPorId={uebPorId}
        direccionPorId={direccionPorId}
        nombreEmpresa={nombreEmpresa}
        nombreUeb={nombreUeb}
        nombreDireccion={nombreDireccion}
      />
    </div>
  );
}
