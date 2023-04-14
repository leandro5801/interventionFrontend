import React from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Form from "./form";
import Dialog from '../Components/Dialog';

function Header() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className={styles.headcontainer}>
      <div className={styles.headwrapper}>
        <div>
        <button className={styles.btn} onClick={() => setMostrarFormulario(true)}>Nueva Intervención</button>
      <Dialog open={mostrarFormulario} onClose={() => setMostrarFormulario(false)}>
        <Form />
      </Dialog>
          
        </div>
      </div>
      
    </div>
  );
}

export default Header;
