import React from "react";

import styles from "../styles/Home.module.css";

import Container from "../Components/Container";

export default function Index() {
  
  return (
    <Container>
      <div className={styles.title}>
        <h5> Bienvenido al módulo de intervenciones</h5>
      </div>
    </Container>
  );
}
