import React, { useState } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Content from "../Components/Content";

export default function Home() {
  const [selectedUeb, setSelectedUeb] = useState(null);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  return (
    <div className={styles.container}>
      <Head>
        <title>Intervenciones Next App</title>
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
      <Header />
      <Content
        selectedUeb={selectedUeb}
        selectedStructure={selectedStructure}
        selectedArea={selectedArea}
      />

      {/* <footer className={styles.footer}>
        <p>
          Creado por Rebeca y Laura Kamila
        </p>
      </footer> */}
    </div>
  );
}
