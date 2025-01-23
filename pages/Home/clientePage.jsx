import styles from "../../styles/Home.module.css";
import ClienteTable from "../../Components/Tables/ClienteTable";
import { Typography } from "@mui/material";
import useClientePage from "../../hooks/useClientePage";

export default function ClientePage() {
  const { clientes, setClientes, users, setUsers, projects, cargando } =
    useClientePage();
  return (
    <div className={styles.title}>
      <Typography variant="h3">Clientes</Typography>
      <ClienteTable
        clientes={clientes}
        setClientes={setClientes}
        users={users}
        setUsers={setUsers}
        cargando={cargando}
        projects={projects}
      />
    </div>
  );
}
