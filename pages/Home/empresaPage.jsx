import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";

import datosEmpresas from "../../public/datosEmpresas.json";
import trabDirProdCitt from "../../public/DirTecProdCit.json";
import EmpresaTable from "../../Components/Tables/EmpresaTable";
export default function EmpresaPage() {

    // datos de las empresas
    const [empresas, setEmpresas] = useState(
      datosEmpresas?.empresas
    );

  return (
    <Container>
      <div className={styles.title}>
        <h3>Empresas</h3>
        <EmpresaTable
            empresas={empresas}
            setEmpresas={setEmpresas}
          />
      </div>
    </Container>
  );
}