import React from "react";

import { Container } from "react-grid-system";
import { Card } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { TableContainer, Paper, Typography } from "@mui/material";
import ReportTable from "../../Components/Tables/ReportTable";
import useReportePage from "../../hooks/useReportePage";

export default function ReportePage() {
  const {
    filtredInterventions,
    filtredRecomendations,
    filtredProjects,
    setRecomendations,
    selectedIntervention,
    setSelectedIntervention,
    nombreConsultor,
    nombreTrabajador,
  } = useReportePage();
  return (
    <div className={styles.title}>
      <Typography variant="h3"> Reportes</Typography>
      <div className={styles.containerReport}>
        <div>
          <ReportTable
            interventions={filtredInterventions}
            recomendations={filtredRecomendations}
            setRecomendations={setRecomendations}
            projects={filtredProjects}
            setSelectedIntervention={setSelectedIntervention}
          />
        </div>
        <div>
          <TableContainer component={Paper} className={styles.tableReport}>
            {selectedIntervention && (
              <>
                {/* Datos de la intervencion seleccionada */}

                <div style={{ padding: "10px" }}>
                  <Typography variant="h4">
                    Detalles de la intervención seleccionada
                  </Typography>
                </div>
                <Container key={selectedIntervention.id_intervencion}>
                  <Card style={{ width: "50rem" }}>
                    <Card.Body>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Card.Title>
                            Nombre de la Intervención:{" "}
                            {selectedIntervention.nombre_intervencion}
                          </Card.Title>
                          <Card.Text>
                            Consultor:{" "}
                            {nombreConsultor(selectedIntervention.id_consultor)}
                          </Card.Text>
                        </div>
                        <div>
                          <Card.Text>
                            Descripción: {selectedIntervention.descripcion}
                          </Card.Text>
                          <Card.Text>
                            Trabajador:{" "}
                            {nombreTrabajador(
                              selectedIntervention.id_trabajador
                            )}
                          </Card.Text>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Container>
              </>
            )}
          </TableContainer>

          {/* Fin del mostrado de Datos de una intervencion */}
        </div>
      </div>
    </div>
  );
}
