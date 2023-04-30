import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Navbar from "./DropdownMenu/NavBar";
import Dialog from "./Forms/Dialog";
import IntervrntionForm from "./Forms/IntervrntionForm";
import CreateRecomendationForm from "./Forms/CreateRecomendationForm";
import { client } from "../utils/fetchWrapper";

function Header({
  setTableVisible,
  interventions,
  setInterventions,
  recomendations,
  setRecomendations,
  consultores,
  classifications,
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
          setDialogRecomendationOpen={setDialogRecomendationOpen}
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
        <Dialog
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
        </Dialog>

      </div>
    </div>
  );
}

export default Header;
