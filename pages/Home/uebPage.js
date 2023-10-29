import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import UebTable from "../../Components/Tables/UebTable";

import datosUeb from "../../public/datosEmpresas.json"
export default function UEBPage() {
      // datos de las ueb
      const [uebs, setUebs] = useState(
        datosUeb?.ueb
      );
      const [empresas, setEmpresas] = useState(
        datosUeb?.empresas
      );
  return (
    <Container>
      <div className={styles.title}>
        <h3> UEBs
        <UebTable
            uebs={uebs}
            setUebs={setUebs}
            empresas={empresas}
          />
        </h3>
      </div>
    </Container>
  );
}
