import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../../styles/Home.module.css";

import UserTable from "../../Components/Tables/UserTable";
import { Typography } from "@mui/material";
import useUsuarioPage from "../../hooks/useUsuarioPage";

export default function UsuarioPage() {
  const {
    users,
    setUsers,
    roles,
    setRoles,
    cargando,
    user,
    clientes,
    consultores,
  } = useUsuarioPage();
  return (
    <div className={styles.title}>
      <Typography variant="h3"> Usuarios</Typography>
      <UserTable
        users={users}
        setUsers={setUsers}
        roles={roles}
        setRoles={setRoles}
        cargando={cargando}
        user={user}
        clientes={clientes}
        consultores={consultores}
      />
    </div>
  );
}
