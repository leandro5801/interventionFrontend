import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import AreaTable from "../../Components/Tables/AreaTable";

import datosUeb from "../../public/datosEmpresas.json"
export default function AreaPage() {
   // datos de las areas
   const [areas, setAreas] = useState(
    datosUeb?.areas
  );
  const [direcciones, setDirecciones] = useState(
    datosUeb?.direcciones
  );
  const [uebs, setUebs] = useState(
    datosUeb?.ueb
  );
  const [empresas, setEmpresas] = useState(
    datosUeb?.empresas
  );
  return (
    <Container>
      <div className={styles.title}>
        <h3> Áreas</h3>
        <AreaTable
            areas={areas}
            setAreas={setAreas}
            empresas={empresas}
            uebs={uebs}
            direcciones={direcciones}
          />
      </div>
    </Container>
  );
}
