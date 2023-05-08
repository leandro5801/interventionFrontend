import { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Content from "../Components/Content";
import axios from 'axios';

import { client } from "../utils/fetchWrapper";

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

export default function Home() {
  const [dialogRecomendationOpen, setDialogRecomendationOpen] = useState(false);

  const [tableVisible, setTableVisible] = useState(false);
  const [interventions, setInterventions] = useState(null);
  const [recomendations, setRecomendations] = useState(null);

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


  const [error, setError] = useState(null);
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

  // Cargando los datos de los procesos
  useEffect(() => {
    client("procesos.json").then(
      (procesos) => {
        setProcess(procesos?.process);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  //Cargando trabajadores
  useEffect(() => {
    client("DirTecProdCit.json").then(
      (trabajador) => {
        setTrabDirProdCit(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    client("DptoCalidadCit.json").then(
      (trabajador) => {
        setTrabCalidadCit(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);
  useEffect(() => {
    client("DptoDireccionCit.json").then(
      (trabajador) => {
        setTrabDireccionCit(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    client("DirTecProdLior.json").then(
      (trabajador) => {
        setTrabDirProdLior(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    client("DptoDireccionLior.json").then(
      (trabajador) => {
        setTrabDireccionLior(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);
  useEffect(() => {
    client("DptoCalidadLior.json").then(
      (trabajador) => {
        setTrabCalidadLior(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    client("DirTecProdAica.json").then(
      (trabajador) => {
        setTrabDirProdAica(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);
  useEffect(() => {
    client("DptoCalidadSh.json").then(
      (trabajador) => {
        setTrabCalidadSh(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    client("DptoDireccionSh.json").then(
      (trabajador) => {
        setDireccionSh(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);
  useEffect(() => {
    client("DptoDireccionSh.json").then(
      (trabajador) => {
        setDireccionSh(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);
  useEffect(() => {
    client("DirTecProdJt.json").then(
      (trabajador) => {
        setTrabDirProdJt(trabajador?.Trabajadores);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  // console.log(trabDireccionSh)

  //Para modificar una intervencion

  useEffect(() => {
    client("datosintervenciones.json").then(
      (datosintervenciones) => {
        setInterventions(datosintervenciones?.tasks);
        setRecomendations(datosintervenciones?.recomendations);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Intervenciones</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
