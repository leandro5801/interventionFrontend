import styles from "../../styles/Home.module.css";
import GanttChart from "../../Components/GanttChart/GanttChart";
import RecomendationTableGantt from "../../Components/Tables/RecomTableGantt";

import { Container } from "react-grid-system";
import { Card } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import useGanttPage from "../../hooks/useGanttPage";

export default function GanttPage() {
  const {
    interventions,
    setInterventions,
    recomendations,
    setRecomendations,
    selectedIntervention,
    setSelectedIntervention,
    projects,
    empresas,
    uebs,
    direcciones,
    areas,
    trabajadores,
    consultores,
    setOpen,
    setTableRData,
    tableRData,
    nombreConsultor,
    nombreTrabajador,
    clasificaciones,
    areaPorId,
    direccionPorId,
    uebPorId,
  } = useGanttPage();
  return (
    <div className={styles.title}>
      <Typography variant="h3" className={styles.tituloH3}>
        Diagrama de Gantt
      </Typography>
      <div>
        <GanttChart
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
          interventions={interventions}
          setInterventions={setInterventions}
          setOpen={setOpen}
          recomendations={recomendations}
          setTableRData={setTableRData}
          projects={projects}
          empresas={empresas}
          uebs={uebs}
          direcciones={direcciones}
          areas={areas}
          trabajadores={trabajadores}
          consultores={consultores}
          nombreTrabajador={nombreTrabajador}
          areaPorId={areaPorId}
          direccionPorId={direccionPorId}
          uebPorId={uebPorId}
        />
      </div>
      {/* datos de una intervencion seleccionada */}
      {/* Datos de una intervencion */}

      <div>
        {selectedIntervention && (
          <>
            {/* Datos de la intervencion seleccionada */}

            <div style={{ padding: "10px" }}>
              <Typography variant="h6">
                <strong>Datos de la intervencion</strong>
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
                        <Typography>
                          Nombre de la Intervención:{" "}
                          {selectedIntervention.nombre_intervencion}
                        </Typography>
                      </Card.Title>
                      <Card.Text>
                        <Typography>
                          {" "}
                          Descripción: {selectedIntervention.descripcion}
                        </Typography>
                      </Card.Text>
                    </div>
                    <div>
                      <Card.Text>
                        <Typography>
                          Consultor:{" "}
                          {nombreConsultor(selectedIntervention.id_consultor)}
                        </Typography>
                      </Card.Text>
                      <Card.Text>
                        <Typography>
                          Trabajador:{" "}
                          {nombreTrabajador(selectedIntervention.id_trabajador)}
                        </Typography>
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Container>

            {/* Datos de Recomendaciones */}
            <RecomendationTableGantt
              tableRData={tableRData}
              setTableRData={setTableRData}
              recomendations={recomendations}
              setRecomendations={setRecomendations}
              selectedIntervention={selectedIntervention}
              nombreConsultor={nombreConsultor}
              clasificaciones={clasificaciones}
            />

            {/* <RecomendationTable
                    recomendations={recomendations}
                    setTableRData={setTableRData}
                    tableRData={tableRData}
                    setRecomendations={setRecomendations}
                    selectedIntervention={selectedIntervention}
                  /> */}
          </>
        )}

        {/* Fin del mostrado de Datos de una intervencion */}
      </div>
    </div>
  );
}
