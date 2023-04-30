import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Navbar from "../Components/DropdownMenu/NavBar";
import Dialog from "./Forms/Dialog";
import IntervrntionForm from "./Forms/IntervrntionForm";
import RecomendationForm from "./Forms/RecomendationForm";
import { client } from "../utils/fetchWrapper";

function Header({
  setTableVisible,
  interventions,
  setInterventions,
  consultores,
}) {
  const [dialogCreInteOpen, setDialogCreInteOpen] = useState(false);
  const [dialogRecomendationOpen, setDialogRecomendationOpen] = useState(false);
  const [process, setProcess] = useState(null);
  useEffect(() => {
    client("procesos.json").then(
      (procesos) => {
        setProcess(procesos?.process);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  const [ueb, setUeb] = useState(null);
  useEffect(() => {
    client("list_UEBs.json").then(
      (ueb) => {
        setUeb(ueb);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);
  return (
    <div className={styles.headcontainer}>
      <div className={styles.headwrapper}>
        <Navbar
          setDialogCreInteOpen={setDialogCreInteOpen}
          setTableVisible={setTableVisible}
        />
        <Dialog
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
          />
        </Dialog>

      </div>
    </div>
  );
}

export default Header;
