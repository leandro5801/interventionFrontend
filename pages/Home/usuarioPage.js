import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";

import Container from "../../Components/Container";
import UserTable from "../../Components/Tables/UserTable";

import datosUsuarios from "../../public/datosUsuarios.json";

export default function UsuarioPage() {
  const [users, setUsers] = useState(
    datosUsuarios?.users
  );
  const [roles, setRoles] = useState(
    datosUsuarios?.roles
  );
  return (
    <Container>
      <div className={styles.title}>
        <h3> Usuarios</h3>
        <UserTable
          users={users}
          setUsers={setUsers}
          roles={roles}
          setRoles={setRoles}
        />
      </div>
    </Container>
  );
}
