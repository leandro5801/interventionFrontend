import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import DireccionTable from "../../Components/Tables/DireccionTable";

import datosUeb from "../../public/datosUeb.json"
export default function DireccionPage() {
   // datos de las direcciones
   const [direcciones, setDirecciones] = useState(
    datosUeb?.direcciones
  );
  return (
    <Container>
      <div className={styles.title}>
        <h3> Direcciones</h3>
        <DireccionTable
            direcciones={direcciones}
            setDirecciones={setDirecciones}
          />
      </div>
    </Container>
  );
}
