import styles from "../styles/Home.module.css";
import { useState } from "react";

import Image from "next/image";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import Link from "next/link";

function SideBar({}) {
  const [showEmpresaOptions, setShowEmpresaOptions] = useState(false);
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
          <li>
            {" "}
            <Link href=" /Home/ganttPage">
              <BarChartOutlinedIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle"}}
              />{" "}
              Gantt
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/Home/proyectoPage">
              <AttractionsOutlinedIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
              /> {" "}
                Proyectos
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/Home/intervencionPage">
              {" "}
              <AssignmentOutlinedIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
              /> {" "}
                Intervenciones
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/Home/recomendacionPage">
              {" "}
              <NoteAltOutlinedIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
              /> {" "}
               Recomendaciones
            </Link>
          </li>
         
          <li>
            {" "}
            <a onClick={() => setShowEmpresaOptions(!showEmpresaOptions)}>
              <ManageSearchOutlinedIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
              /> {" "}
               Datos de la Empresa
              {showEmpresaOptions ? (
                <ExpandLessOutlinedIcon
                  style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
                />
              ) : (
                <ExpandMoreOutlinedIcon
                  style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
                />
              )}
            </a>
          </li>

          {showEmpresaOptions && (
            <>
            <li>
                {" "}
                <Link href="/Home/empresaPage">
                  {" "}
                  <ApartmentOutlinedIcon
                    style={{ width: "18px", cursor: "pointer",marginLeft:"10px", verticalAlign: "middle" }}
                  /> {" "}
                 Empresa
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/uebPage">
                  {" "}
                  <CorporateFareOutlinedIcon
                    style={{ width: "18px", cursor: "pointer",marginLeft:"10px", verticalAlign: "middle" }}
                  /> {" "}
                  UEB
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/direccionPage">
                  <BusinessOutlinedIcon
                    style={{ width: "18px", cursor: "pointer", marginLeft:"10px", verticalAlign: "middle" }}
                  /> {" "}
                  Direcciones
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/areaPage">
                  <DragIndicatorOutlinedIcon
                    style={{ width: "18px", cursor: "pointer", marginLeft:"10px", verticalAlign: "middle" }}
                  /> {" "}
                  Áreas
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/trabajadorPage">
                  {" "}
                  <EngineeringOutlinedIcon
                    style={{ width: "18px", cursor: "pointer", marginLeft:"10px", verticalAlign: "middle" }}
                  /> {" "}
                  Trabajadores
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/Home/cargarDatosPage">
                  {" "}
                  <PublishedWithChangesOutlinedIcon
                    style={{ width: "18px", cursor: "pointer", marginLeft:"10px", verticalAlign: "middle" }}
                  /> {" "}
                  Cargar Datos
                </Link>
              </li>
            </>
          )}
          <li>
            {" "}
            <Link href="/Home/reportePage">
              {" "}
              <FeedOutlinedIcon style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }} />
              {" "}
              Reportes
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/Home/usuarioPage">
              {" "}
              <ManageAccountsIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
              /> {" "}
              Usuarios
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/Home/consultorPage">
              {" "}
              <PeopleAltOutlinedIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
              /> {" "}
              Consultores
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/Home/clientePage">
              {" "}
              <Person3OutlinedIcon
                style={{ width: "18px", cursor: "pointer", verticalAlign: "middle" }}
              /> {" "}
              Clientes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
