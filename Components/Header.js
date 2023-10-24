import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Navbar from "./DropdownMenu/NavBar";
import Dialog from "./Forms/Dialog";
import IntervrntionForm from "./Forms/IntervrntionForm";
import CreateRecomendationForm from "./Forms/CreateRecomendationForm";
import { client } from "../utils/fetchWrapper";
import Logout from "../pages/Home/Logout/Logout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Header({
  setIsAuthenticated,
}) {
  const [dialogCreInteOpen, setDialogCreInteOpen] = useState(false);
  const [dialogRecomendationOpen, setDialogRecomendationOpen] = useState(false);
  const [mostrarLogout, setMostrarLogout] = useState(false);

  // const [ueb, setUeb] = useState(null);
  // useEffect(() => {
  //   client("list_UEBs.json").then(
  //     (ueb) => {
  //       setUeb(ueb);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  const manejarMostrarLogout = () => {
    setMostrarLogout(true);
  };

  return (
    <div>
      <div className={styles.headcontainer}>
        <div className={styles.headwrapper}>
          <div className={styles.title}>
            <h2>Intervenciones</h2>
          </div>
          {/* <Navbar
          setDialogCreInteOpen={setDialogCreInteOpen}
          setTableVisible={setTableVisible}
          setDialogRecomendationOpen={setDialogRecomendationOpen}
        />
        <Dialog
          className={styles.dialogContent}
          open={dialogCreInteOpen}
          onClose={() => {
            setDialogCreInteOpen(false);
          }}
        >
          <IntervrntionForm
            setInterventions={setInterventions}
            interventions={interventions}
            onSave={() => {
              setDialogCreInteOpen(false);
            }}
            onCancel={() => {
              setDialogCreInteOpen(false);
            }}
            consultores={consultores}
            process={process}
            trabDirProdCit={trabDirProdCit}
            trabCalidadCit={trabCalidadCit}
            trabDireccionCit={trabDireccionCit}
            trabDirProdLior={trabDirProdLior}
            trabDireccionLior={trabDireccionLior}
            trabCalidadLior={trabCalidadLior}
            trabDirProdAica={trabDirProdAica}
            trabCalidadSh={trabCalidadSh}
            trabDireccionSh={trabDireccionSh}
            trabDirProdJt={trabDirProdJt}
          />
        </Dialog>
        <Dialog
          className={styles.dialogContentCR}
          open={dialogRecomendationOpen}
          onClose={() => {
            setDialogRecomendationOpen(false);
          }}
        >
          <CreateRecomendationForm
            setInterventions={setInterventions}
            interventions={interventions}
            recomendations={recomendations}
            setRecomendations={setRecomendations}
            onSave={() => {
              setDialogRecomendationOpen(false);
            }}
            onCancel={() => {
              setDialogRecomendationOpen(false);
            }}
            classifications={classifications}
            consultores={consultores}
          />
        </Dialog> */}
        </div>

        <div
        className={styles.faIconOutAltContent}
        >
          <LogoutOutlinedIcon
            onClick={() => setMostrarLogout(true)}
            className={styles.faIconOutAlt}
          />
          {mostrarLogout && (
            <Logout
              setIsAuthenticated={setIsAuthenticated}
              setMostrarLogout={setMostrarLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
