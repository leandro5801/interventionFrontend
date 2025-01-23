import { useState, useEffect } from "react";
import axios from "axios";
export default function useDireccionesPage() {
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
    console.log(filteredEmpresa);
  }
  return {
    direcciones: filteredDireccion,
    uebs: filteredUeb,
    empresas: filteredEmpresa,
    areas,
    cargando,
    setDirecciones,
  };
}
