import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import TrabajadorTable from "../../Components/Tables/TrabajadorTable";

import datosUeb from "../../public/datosUeb.json"
export default function TrabajadorPage() {
   // datos de las ueb
   const [trabajadores, setTrabajadores] = useState(
    datosUeb?.trabajadores
  );
  return (
    <Container>
      <div className={styles.title}>
        <h3>Trabajadores</h3>
        <TrabajadorTable
            trabajadores={trabajadores}
            setTrabajadores={setTrabajadores}
          />
      </div>
    </Container>
  );
}
