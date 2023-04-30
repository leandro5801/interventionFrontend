import { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Content from "../Components/Content";

import { client } from "../utils/fetchWrapper";

const clasificaciones= [
  { id: 1, name: 'Tipo 1' },
  { id: 2, name: 'Tipo 2' },
  { id: 3, name: 'Tipo 3' }
];
const consultoress= [
  { id: 1, name: 'Carlos Ramón López Paz' },
  { id: 2, name: 'Laura Alfonzo Perez' },
  { id: 3, name: 'Lazaro Días Alvares' }
];

export default function Home() {
  // para el filtrado
  const [selectedUeb, setSelectedUeb] = useState(null);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const [dialogRecomendationOpen, setDialogRecomendationOpen] = useState(false);


  const [tableVisible, setTableVisible] = useState(false);
  const [interventions, setInterventions] = useState(null);
  const [recomendations, setRecomendations] = useState(null);

  const [classifications, setClassifications] = useState(clasificaciones);
  const [consultores, setConsultores] = useState(consultoress);


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
        dialogRecomendationOpen={dialogRecomendationOpen}
        setDialogRecomendationOpen={setDialogRecomendationOpen}
      />

      {/* <footer className={styles.footer}>
        <p>
          Creado por Rebeca y Laura Kamila
        </p>
      </footer> */}
    </div>
  );
}
