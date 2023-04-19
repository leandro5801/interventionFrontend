import React from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Navbar from "../Components/DropdownMenu/NavBar";
import  Dialog  from "./Dialog";
import Form from "./form"

function Header({setTableVisible }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className={styles.headcontainer}>
      <div className={styles.headwrapper}>
        {/* <div>
          <button
            className={styles.btn}
            onClick={() => setMostrarFormulario(true)}
          >
            Nueva Intervención
          </button>
          <Dialog
            open={mostrarFormulario}
            onClose={() => setMostrarFormulario(false)}
          >
            <Form />
          </Dialog>
        </div> */}

        <Navbar setDialogOpen={setDialogOpen} setTableVisible={setTableVisible}/>
        <Dialog
            open={dialogOpen}
            onClose={() => {setMostrarFormulario(false), setDialogOpen(false)}}
          >
            <Form />
          </Dialog>
      </div>
    </div>
  );
}

export default Header;
