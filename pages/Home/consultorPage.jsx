import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";

import ConsultorTable from "../../Components/Tables/ConsultorTable";

import datosUsuarios from "../../public/datosUsuarios.json";

export default function ConsultorPage() {
  const [consultores, setConsultores] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function fetchConsultor() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/consultor');
        setConsultores(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchUsuario() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/usuario');
        setUsers(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    fetchConsultor();
    fetchUsuario();
  }, []);
console.log(consultores, users)
  return (
    <div className={styles.title}>
      <h3>Consultores</h3>
      <ConsultorTable
        consultores={consultores}
        setConsultores={setConsultores}
        users={users}
        setUsers={setUsers}
        cargando={cargando}
      />
    </div>
  );
}
