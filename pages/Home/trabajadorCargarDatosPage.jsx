import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import TrabajadorCargarDatosTable from "../../Components/Tables/TrabajadorCargarDatosTable";

export default function TrabajadorPage() {
  // datos de las ueb
  const [trabajadores, setTrabajadores] = useState([]);
  const [areas, setAreas] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [uebs, setUebs] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  let filteredEmpresa = [];
  let filteredUeb = [];
  let filteredDireccion = [];
  let filteredArea = [];
  let filteredTrabajador = [];

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
    fetchEmpresa();
    fetchUeb();
    fetchDireccion();
    fetchArea();
    fetchTrabajador();
  }, []);

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
    filteredTrabajador = trabajadores.filter((trabajador) =>
      filteredArea.find(
        (area) => area.id_area === trabajador.id_area
      )
    );
  }

  return (
    <div className={styles.title}>
      <h3>Trabajadores</h3>
      <TrabajadorCargarDatosTable
        trabajadores={filteredTrabajador}
        setTrabajadores={setTrabajadores}
        empresas={filteredEmpresa}
        uebs={filteredUeb}
        direcciones={filteredDireccion}
        areas={filteredArea}
        cargando={cargando}
      />
    </div>
  );
}
