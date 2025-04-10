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
import { Box, Typography } from "@mui/material";
import useLocalStorage from "../helpers/useLocalStorage";

function SideBar({}) {
  const [showGestionarEmpresaOptions, setShowGestionarEmpresaOptions] =
    useState(false);
  const [showCargarEmpresaOptions, setShowCargarEmpresaOptions] =
    useState(false);

  const [showCargarDatos, setShowCargarDatos] = useState(false);
  const handleShowDatos = () => {
    setShowCargarDatos(!showCargarDatos);
  };
  const { get } = useLocalStorage();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const token = get("access_token");
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
    <Box className={styles.sidebarcontainer}>
      <div className={styles.logo}>
        <Image
          className={styles.logo}
          src="/images/O4ayguJu_400x400-removebg-preview.png" // Ruta al icono de usuario
          alt="User Icon"
          width={120}
          height={120}
          style={{ aspectRatio: "auto" }}
        />
      </div>

      <Typography variant="caption" className={styles.wrapper}>
        <ul>
          {user && (user.id_rol === 3 || user.id_rol === 2) ? (
            <li>
              {" "}
              <Link href=" /Home/ganttPage">
                <Typography>
                  <BarChartOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Gantt
                </Typography>
              </Link>
            </li>
          ) : (
            false
          )}
          {user && user.id_rol === 3 ? (
            <li>
              {" "}
              <Link href="/Home/proyectoPage">
                <Typography>
                  <AttractionsOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Proyectos
                </Typography>
              </Link>{" "}
            </li>
          ) : (
            false
          )}
          {user && (user.id_rol === 3 || user.id_rol === 2) ? (
            <li>
              {" "}
              <Link href="/Home/intervencionPage">
                {" "}
                <Typography>
                  <AssignmentOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Intervenciones
                </Typography>
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
                <Typography>
                  <NoteAltOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Recomendaciones
                </Typography>
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
                <Typography>
                  <ApartmentOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Empresa
                </Typography>
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
                <Typography>
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
                </Typography>
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
                  <Typography>
                    <CorporateFareOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    UEB
                  </Typography>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/direccionPage">
                  <Typography>
                    <BusinessOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Direcciones
                  </Typography>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/areaPage">
                  <Typography>
                    <DragIndicatorOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Áreas
                  </Typography>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/trabajadorPage">
                  {" "}
                  <Typography>
                    <EngineeringOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Trabajadores
                  </Typography>
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
                <Typography>
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
                </Typography>
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
                  <Typography>
                    <CorporateFareOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    UEB
                  </Typography>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/direccionCargarDatosPage">
                  <Typography>
                    <BusinessOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Direcciones
                  </Typography>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/areaCargarDatosPage">
                  <Typography>
                    <DragIndicatorOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Áreas
                  </Typography>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/trabajadorCargarDatosPage">
                  {" "}
                  <Typography>
                    <EngineeringOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Trabajadores
                  </Typography>
                </Link>
              </li>
            </>
          )}
          {user && (user.id_rol === 4 || user.id_rol === 3) ? (
            <li>
              {" "}
              <Link href="/Home/reportePage">
                {" "}
                <Typography>
                  <FeedOutlinedIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Reportes
                </Typography>
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
                <Typography>
                  <ManageAccountsIcon
                    style={{
                      width: "18px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Usuarios
                </Typography>
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
                  <Typography>
                    <PeopleAltOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Consultores
                  </Typography>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/clientePage">
                  {" "}
                  <Typography>
                    <Person3OutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Clientes
                  </Typography>
                </Link>
              </li>
              {/* <li>
                <a onClick={handleShowDatos}>
                  {" "}
                  <Typography>
                    <PublishedWithChangesOutlinedIcon
                      style={{
                        width: "18px",
                        cursor: "pointer",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Cargar Datos
                    {showCargarDatos ? (
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
                  </Typography>
                </a>
              </li>

              {showCargarDatos && (
                <>
                  <li>
                    {" "}
                    <Link href="/Home/proyectoCargarDatosPage">
                      <Typography>
                        <AttractionsOutlinedIcon
                          style={{
                            width: "18px",
                            cursor: "pointer",
                            verticalAlign: "middle",
                            marginLeft: "10px",
                          }}
                        />{" "}
                        Proyectos
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="/Home/intervencionCargarDatosPage">
                      {" "}
                      <Typography>
                        <AssignmentOutlinedIcon
                          style={{
                            width: "18px",
                            cursor: "pointer",
                            verticalAlign: "middle",
                            marginLeft: "10px",
                          }}
                        />{" "}
                        Intervenciones
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="/Home/recomendacionCargarDatosPage">
                      {" "}
                      <Typography>
                        <NoteAltOutlinedIcon
                          style={{
                            width: "18px",
                            cursor: "pointer",
                            verticalAlign: "middle",
                            marginLeft: "10px",
                          }}
                        />{" "}
                        Recomendaciones
                      </Typography>
                    </Link>
                  </li>
                </>
              )}*/}
            </>
          ) : (
            false
          )}{" "}
        </ul>
      </Typography>
    </Box>
  );
}

export default SideBar;
