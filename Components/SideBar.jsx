import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Image from "next/image";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import Link from "next/link";

function SideBar({}) {
  const [showGestionarEmpresaOptions, setShowGestionarEmpresaOptions] =
    useState(false);
  const [showCargarEmpresaOptions, setShowCargarEmpresaOptions] =
    useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const token = Cookies.get("access_token");
        const response = await axios.get(
          "http://localhost:3000/api/autenticacion/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getProfile();
  }, []);

  return (
    <div className={styles.sidebarcontainer}>
      <div className={styles.logo}>
        <Image
          className={styles.logo}
          src="/images/aica-ico.jpg" // Ruta al icono de usuario
          alt="User Icon"
          width={90}
          height={55}
        />
      </div>

      <div className={styles.wrapper}>
        <ul>
          {user && (user.id_rol === 3 || user.id_rol === 2) ? (
            <li>
              {" "}
              <Link href=" /Home/ganttPage">
                <BarChartOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Gantt
              </Link>
            </li>
          ) : (
            false
          )}
          {user && user.id_rol === 3 ? (
            <li>
              {" "}
              <Link href="/Home/proyectoPage">
                <AttractionsOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Proyectos
              </Link>
            </li>
          ) : (
            false
          )}
          {user && (user.id_rol === 3 || user.id_rol === 2) ? (
            <li>
              {" "}
              <Link href="/Home/intervencionPage">
                {" "}
                <AssignmentOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Intervenciones
              </Link>
            </li>
          ) : (
            false
          )}
          {user && (user.id_rol === 3 || user.id_rol === 2) ? (
            <li>
              {" "}
              <Link href="/Home/recomendacionPage">
                {" "}
                <NoteAltOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Recomendaciones
              </Link>
            </li>
          ) : (
            false
          )}
          {user && user.id_rol === 1 ? (
            <li>
              {" "}
              <Link href="/Home/empresaPage">
                {" "}
                <ApartmentOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Empresa
              </Link>
            </li>
          ) : (
            false
          )}
          {user && user.id_rol === 1 ? (
            <li>
              {" "}
              <a
                onClick={() =>
                  setShowGestionarEmpresaOptions(!showGestionarEmpresaOptions)
                }
              >
                <ManageSearchOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Gestionar Estructura
                {showGestionarEmpresaOptions ? (
                  <ExpandLessOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />
                ) : (
                  <ExpandMoreOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </a>
            </li>
          ) : (
            false
          )}
          {showGestionarEmpresaOptions && (
            <>
              <li>
                {" "}
                <Link href="/Home/uebPage">
                  {" "}
                  <CorporateFareOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  UEB
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/direccionPage">
                  <BusinessOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Direcciones
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/areaPage">
                  <DragIndicatorOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Áreas
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/trabajadorPage">
                  {" "}
                  <EngineeringOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Trabajadores
                </Link>
              </li>
            </>
          )}
          {user && user.id_rol === 1 ? (
            <li>
              {" "}
              <a
                onClick={() =>
                  setShowCargarEmpresaOptions(!showCargarEmpresaOptions)
                }
              >
                <PublishedWithChangesOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Cargar Estructura
                {showCargarEmpresaOptions ? (
                  <ExpandLessOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />
                ) : (
                  <ExpandMoreOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </a>
            </li>
          ) : (
            false
          )}
          {showCargarEmpresaOptions && (
           <>
           <li>
             {" "}
             <Link href="/Home/uebCargarDatosPage">
               {" "}
               <CorporateFareOutlinedIcon
                 style={{
                   width: "18px",
                   cursor: "pointer",
                   marginLeft: "10px",
                   verticalAlign: "middle",
                 }}
               />{" "}
               UEB
             </Link>
           </li>
           <li>
             {" "}
             <Link href="/Home/direccionCargarDatosPage">
               <BusinessOutlinedIcon
                 style={{
                   width: "18px",
                   cursor: "pointer",
                   marginLeft: "10px",
                   verticalAlign: "middle",
                 }}
               />{" "}
               Direcciones
             </Link>
           </li>
           <li>
             {" "}
             <Link href="/Home/areaCargarDatosPage">
               <DragIndicatorOutlinedIcon
                 style={{
                   width: "18px",
                   cursor: "pointer",
                   marginLeft: "10px",
                   verticalAlign: "middle",
                 }}
               />{" "}
               Áreas
             </Link>
           </li>
           <li>
             {" "}
             <Link href="/Home/trabajadorCargarDatosPage">
               {" "}
               <EngineeringOutlinedIcon
                 style={{
                   width: "18px",
                   cursor: "pointer",
                   marginLeft: "10px",
                   verticalAlign: "middle",
                 }}
               />{" "}
               Trabajadores
             </Link>
           </li>
         </>
          )}
          {user && (user.id_rol === 4 || user.id_rol === 3) ? (
            <li>
              {" "}
              <Link href="/Home/reportePage">
                {" "}
                <FeedOutlinedIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Reportes
              </Link>
            </li>
          ) : (
            false
          )}
          {user && user.id_rol === 1 ? (
            <li>
              {" "}
              <Link href="/Home/usuarioPage">
                {" "}
                <ManageAccountsIcon
                  style={{
                    width: "18px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                />{" "}
                Usuarios
              </Link>
            </li>
          ) : (
            false
          )}
          {user && user.id_rol === 3 ? (
            <>
              <li>
                {" "}
                <Link href="/Home/consultorPage">
                  {" "}
                  <PeopleAltOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Consultores
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/clientePage">
                  {" "}
                  <Person3OutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Clientes
                </Link>
              </li>
            </>
          ) : (
            false
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
