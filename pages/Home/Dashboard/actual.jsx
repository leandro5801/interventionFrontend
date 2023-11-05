import { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import SideBar from "../../../Components/SideBar";
import Header from "../../../Components/Header";
import Content from "../../../Components/Content";
import axios from "axios";

import { client } from "../../../utils/fetchWrapper";
import datos from '../../../public/datosintervenciones.json';
const intervenciones = [
  {
      "id": 1,
      "name": "Intervencion 1",
      "description": "Intervencion 1 ",
      "process": "Gestión del Capital humano",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "CENTRO DE CONTROL                                                               ",
      "worker": "Daysi  Martinez  Randich",
      "start": "2023-01-01",
      "end": "2023-01-04",
      "consultor": "Carlos Ramón López Paz",
      "progress": 100
  },
  {
      "id": 2,
      "name": "Intervencion 2",
      "description": "Intervencion 2 ",
      "process": "Gestión de la Dirección",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "DIRECCIÒN                                                                       ",
      "worker": "Liset  Perez  Lavin",
      "start": "2023-01-02",
      "end": "2023-01-08",
      "consultor": "Laura Alfonzo Perez",
      "progress": 100
  },
  {
      "id": 3,
      "name": "Intervencion 3",
      "description": "Intervencion 3 ",
      "process": "Gestión de Información y comunicación",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "GRUPO DE INFORMÀTICA                                                            ",
      "worker": "Venus  Paez  Fuentes",
      "start": "2023-01-12",
      "end": "2023-01-16",
      "consultor": "Alberto López Gónzalez",
      "progress": 75
  },
  {
      "id": 4,
      "name": "Intervencion 4",
      "description": "Intervencion 4 ",
      "process": "Gestión de Información y comunicación",
      "ueb": "LIORAD",
      "structure": "Departamento de Direción",
      "area": "DIRECCIÓN                                                                       ",
      "worker": "Venus  Paez  Fuentes",
      "start": "2023-01-18",
      "end": "2023-01-24",
      "consultor": "Alberto López Gónzalez",
      "progress": 75
  },
  {
      "id": 5,
      "name": "Intervencion 5",
      "description": "Intervencion 4 ",
      "process": "Gestión de Información y comunicación",
      "ueb": "LIORAD",
      "structure": "Departamento de Direción",
      "area": "DIRECCIÓN                                                                       ",
      "worker": "Liset  Perez  Lavin",
      "start": "2023-01-22",
      "end": "2023-01-23",
      "consultor": "Alberto López Gónzalez",
      "progress": 75
  },
  {
      "id": 6,
      "name": "Intervencion 6",
      "description": "Intervencion 6 ",
      "process": "Gestión del Capital humano",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "CENTRO DE CONTROL                                                               ",
      "worker": "Daysi  Martinez  Randich",
      "start": "2023-01-01",
      "end": "2023-01-04",
      "consultor": "Carlos Ramón López Paz",
      "progress": 100
  },
  {
      "id": 7,
      "name": "Intervencion 7",
      "description": "Intervencion 7",
      "process": "Gestión de Información y comunicación",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "CENTRO DE CONTROL                                                               ",
      "worker": "Daysi  Martinez  Randich",
      "start": "2023-02-01",
      "end": "2023-02-04",
      "consultor": "Carlos Ramón López Paz",
      "progress": 100
  },
  {
      "id": 8,
      "name": "Intervencion 8",
      "description": "Intervencion 8 ",
      "process": "Gestión del Capital humano",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "CENTRO DE CONTROL                                                               ",
      "worker": "Daysi  Martinez  Randich",
      "start": "2023-01-01",
      "end": "2023-01-07",
      "consultor": "Carlos Ramón López Paz",
      "progress": 100
  },
  {
      "id": 9,
      "name": "Intervencion 9",
      "description": "Intervencion 9 ",
      "process": "Gestión del Capital humano",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "CENTRO DE CONTROL                                                               ",
      "worker": "Daysi  Martinez  Randich",
      "start": "2023-02-24",
      "end": "2023-02-27",
      "consultor": "Carlos Ramón López Paz",
      "progress": 100
  },
  {
      "id": 10,
      "name": "Intervencion 10",
      "description": "Intervencion 10 ",
      "process": "Gestión del Capital humano",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "CENTRO DE CONTROL                                                               ",
      "worker": "Daysi  Martinez  Randich",
      "start": "2022-01-01",
      "end": "2022-01-04",
      "consultor": "Carlos Ramón López Paz",
      "progress": 100
  },
  {
      "id": 11,
      "name": "Intervencion 11",
      "description": "Intervencion 11 ",
      "process": "Gestión de Inversiones",
      "ueb": "SH+",
      "structure": "Departamento de Direción",
      "area": "DIRECCIÒN                                                                       ",
      "worker": "Liset  Perez  Lavin",
      "start": "2023-01-02",
      "end": "2023-01-08",
      "consultor": "Laura Alfonzo Perez",
      "progress": 100
  }
];
const  recomendaciones=[
      {
          "id": 1,
          "idIntervention": 1,
          "name": "Recom1 Int1",
          "description": "Esta es la primera recomendacion de la primera intervención",
          "consultor": "Carlos Ramón López Paz",
          "follow": "Sí",
          "classification": "Tipo 1"
      },
      {
          "id": 2,
          "idIntervention": 1,
          "name": "Recom2 Int1",
          "description": "Esta es la segunda recomendacion de la primera intervención",
          "consultor": "Laura Alfonzo Perez",
          "follow": "No",
          "classification": "Tipo 1"
      },
      {
          "id": 3,
          "idIntervention": 2,
          "name": "Recom1 Int2",
          "description": "Esta es la primera recomendacion de la segunda intervención",
          "consultor": "Laura Alfonzo Perez",
          "follow": "Sí",
          "classification": "Tipo 1"
      },
      {
          "id": 4,
          "idIntervention": 3,
          "name": "Recom1 Int3",
          "description": "Esta es la primera recomendacion de la tercera intervención",
          "consultor": "Laura Alfonzo Perez",
          "follow": "No",
          "classification": "Tipo 1"
      },
      {
          "id": 5,
          "idIntervention": 1,
          "name": "Recom3 Int1",
          "description": "Esta es la tercera recomendacion de la primera intervención",
          "consultor": "Laura Alfonzo Perez",
          "follow": "No",
          "classification": "Tipo 1"
      },
      {
          "id": 6,
          "idIntervention": 1,
          "name": "Recom4 Int1",
          "description": "Esta es la cuarta recomendacion de la primera intervención",
          "consultor": "Laura Alfonzo Perez",
          "follow": "No",
          "classification": "Tipo 1"
      },
      {
          "id": 7,
          "idIntervention": 1,
          "name": "Recom5 Int1",
          "description": "Esta es la quinta recomendacion de la primera intervención",
          "consultor": "Laura Alfonzo Perez",
          "follow": "No",
          "classification": "Tipo 1"
      },
      {
          "id": 8,
          "idIntervention": 1,
          "name": "Recom6 Int1",
          "description": "Esta es la sexta recomendacion de la primera intervención",
          "consultor": "Laura Alfonzo Perez",
          "follow": "No",
          "classification": "Tipo 1"
      }
  ];

const clasificaciones = [
  { id: 1, name: "Tipo 1" },
  { id: 2, name: "Tipo 2" },
  { id: 3, name: "Tipo 3" },
];
const consultoress = [
  { id: 1, name: "Carlos Ramón López Paz" },
  { id: 2, name: "Laura Alfonzo Perez" },
  { id: 2, name: "Alberto López Gónzalez" },
  { id: 3, name: "Lazaro Días Alvares" },
];

export default function Home({ setIsAuthenticated }) {
  const [dialogRecomendationOpen, setDialogRecomendationOpen] = useState(false);
  // datosintervenciones?.tasks
  const [tableVisible, setTableVisible] = useState(false);
  const [interventions, setInterventions] = useState(intervenciones);
  const [recomendations, setRecomendations] = useState(recomendaciones);

  // para el filtrado
  const [selectedUeb, setSelectedUeb] = useState(null);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const [classifications, setClassifications] = useState(clasificaciones);
  const [consultores, setConsultores] = useState(consultoress);
  const [process, setProcess] = useState(null);

  //trabajadores
  const [trabDirProdCit, setTrabDirProdCit] = useState(null);
  const [trabCalidadCit, setTrabCalidadCit] = useState(null);
  const [trabDireccionCit, setTrabDireccionCit] = useState(null);
  const [trabDirProdLior, setTrabDirProdLior] = useState(null);
  const [trabDireccionLior, setTrabDireccionLior] = useState(null);
  const [trabCalidadLior, setTrabCalidadLior] = useState(null);
  const [trabDirProdAica, setTrabDirProdAica] = useState(null);
  const [trabCalidadSh, setTrabCalidadSh] = useState(null);
  const [trabDireccionSh, setDireccionSh] = useState(null);
  const [trabDirProdJt, setTrabDirProdJt] = useState(null);

  //  Cargando intervenciones de BD
  // useEffect(() => {
  //   async function fetchIntervention(){
  //     const response = await axios.get('http://localhost:3000/api/intervencion');
  //     setInterventions(response.data);
  //   }
  //   fetchIntervention();
  // }, []);

  // async function getServerSideProps() {
  //   const res = await axios.get('http://localhost:3000/api/intervencion');
  //   const data = res.data;
  //   setInterventions(data);
  // }

  // // Cargando los datos de los procesos
  // useEffect(() => {
  //   client("procesos.json").then(
  //     (procesos) => {
  //       setProcess(procesos?.process);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // //Cargando trabajadores
  // useEffect(() => {
  //   client("DirTecProdCit.json").then(
  //     (trabajador) => {
  //       setTrabDirProdCit(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   client("DptoCalidadCit.json").then(
  //     (trabajador) => {
  //       setTrabCalidadCit(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);
  // useEffect(() => {
  //   client("DptoDireccionCit.json").then(
  //     (trabajador) => {
  //       setTrabDireccionCit(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   client("DirTecProdLior.json").then(
  //     (trabajador) => {
  //       setTrabDirProdLior(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   client("DptoDireccionLior.json").then(
  //     (trabajador) => {
  //       setTrabDireccionLior(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);
  // useEffect(() => {
  //   client("DptoCalidadLior.json").then(
  //     (trabajador) => {
  //       setTrabCalidadLior(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   client("DirTecProdAica.json").then(
  //     (trabajador) => {
  //       setTrabDirProdAica(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);
  // useEffect(() => {
  //   client("DptoCalidadSh.json").then(
  //     (trabajador) => {
  //       setTrabCalidadSh(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   client("DptoDireccionSh.json").then(
  //     (trabajador) => {
  //       setDireccionSh(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);
  // useEffect(() => {
  //   client("DptoDireccionSh.json").then(
  //     (trabajador) => {
  //       setDireccionSh(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);
  // useEffect(() => {
  //   client("DirTecProdJt.json").then(
  //     (trabajador) => {
  //       setTrabDirProdJt(trabajador?.Trabajadores);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // console.log(trabDireccionSh)

  //Para modificar una intervencion
  // ../../../public/datosintervenciones.json

  // useEffect(() => {
  //   async function fetchIntervention(){
  //     const response = await fetch('../../../public/datosintervenciones.json');
  //     setInterventions(response.data);
  //   }
  //   fetchIntervention();
  // }, []);

  // async function getServerSideProps() {
  //   const res = await axios.get('http://localhost:3000/api/intervencion');
  //   const data = res.data;
  //   setInterventions(data);
  // }
  // useEffect(() => {
  //   client("datosintervenciones.json").then(
  //     (datosintervenciones) => {
  //       setInterventions(datosintervenciones?.tasks);
  //       setRecomendations(datosintervenciones?.recomendations);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);
  
  console.log(interventions);
  return (
  
    <div className={styles.container}>
      <Head >
        <title>Intervenciones</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/management-icon.png" />
        
      </Head>
      <SideBar
        selectedUeb={selectedUeb}
        setSelectedUeb={setSelectedUeb}
        selectedStructure={selectedStructure}
        setSelectedStructure={setSelectedStructure}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />
      <Header
        setTableVisible={setTableVisible}
        interventions={interventions}
        setInterventions={setInterventions}
        recomendations={recomendations}
        setRecomendations={setRecomendations}
        consultores={consultores}
        process={process}
        trabDirProdCit={trabDirProdCit}
        trabCalidadCit={trabCalidadCit}
        trabDireccionCit={trabDireccionCit}
        trabDirProdLior={trabDirProdLior}
        trabDireccionLior={trabDireccionLior}
        trabCalidadLior={trabCalidadLior}
        trabDirProdAica={trabDirProdAica}
        trabDireccionSh={trabDireccionSh}
        trabCalidadSh={trabCalidadSh}
        trabDirProdJt={trabDirProdJt}
        classifications={classifications}
        dialogRecomendationOpen={dialogRecomendationOpen}
        setDialogRecomendationOpen={setDialogRecomendationOpen}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Content
        selectedUeb={selectedUeb}
        selectedStructure={selectedStructure}
        selectedArea={selectedArea}
        interventionTableVisible={tableVisible}
        setInterventionTableVisible={setTableVisible}
        interventions={interventions}
        setInterventions={setInterventions}
        recomendations={recomendations}
        setRecomendations={setRecomendations}
        classifications={classifications}
        consultores={consultores}
        process={process}
        trabDirProdCit={trabDirProdCit}
        trabCalidadCit={trabCalidadCit}
        trabDireccionCit={trabDireccionCit}
        trabDirProdLior={trabDirProdLior}
        trabDireccionLior={trabDireccionLior}
        trabCalidadLior={trabCalidadLior}
        trabDirProdAica={trabDirProdAica}
        trabCalidadSh={trabCalidadSh}
        trabDireccionSh={trabDireccionSh}
        trabDirProdJt={trabDirProdJt}
        dialogRecomendationOpen={dialogRecomendationOpen}
        setDialogRecomendationOpen={setDialogRecomendationOpen}
      />
    </div>

  );
}
