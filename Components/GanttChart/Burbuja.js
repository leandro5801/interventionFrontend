import styles from "../../styles/Home.module.css";

import { Container } from "react-grid-system";
import { Card } from "react-bootstrap";
import DialogTitle from '@mui/material/DialogTitle';

export default function Burbuja({intervention}) {


  return (
    <Container key={intervention.id}>
    <Card style={{ width: "60rem" }}>
      <Card.Body>
        <Card.Title>
          Intervención: {intervention.name}
        </Card.Title>
        <Card.Text>
          Descripción: {intervention.description}
        </Card.Text>
        <Card.Text>
          Consultor: {intervention.consultor}
        </Card.Text>
        <Card.Text>
          Trabajador: {intervention.worker}
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
  );
}