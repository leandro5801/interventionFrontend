// hooks/useUser.js
import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export default function useUser({
  users,
  setUsers,
  roles,
  cargando,
  usuarioAutenticado,
  clientes,
  consultores,
}) {
  // Estados
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userNameFilter, setUserNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [openDialogAdvertenciaCliente, setOpenDialogAdvertenciaCliente] =
    useState(false);
  const [openDialogAdvertenciaConsultor, setOpenDialogAdvertenciaConsultor] =
    useState(false);
  const [esUsuarioPropio, setEsUsuarioPropio] = useState(false);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const [error, setError] = useState(null);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [data, setData] = useState("");

  // Memoizados
  const nombreRol = useCallback(
    (id_rol) => {
      const role = roles.find((rol) => rol.id_rol === id_rol);
      return role ? role.nombre_rol : "no se encontro el nombre";
    },
    [roles]
  );

  const filteredData = useMemo(
    () =>
      users
        .map((item) => ({
          ...item,
          roleName: nombreRol(item.id_rol),
        }))
        .filter(
          (item) =>
            item.nombre_usuario
              .toLowerCase()
              .includes(userNameFilter.toLowerCase()) &&
            item.roleName.toLowerCase().includes(roleFilter.toLowerCase())
        ),
    [users, userNameFilter, roleFilter, nombreRol]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Handlers
  const handleClose = useCallback(() => setOpen(false), []);
  const toggleFilters = useCallback(() => setShowFilters((prev) => !prev), []);
  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);
  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  const handleUserNameFilterChange = useCallback(
    (e) => setUserNameFilter(e.target.value),
    []
  );
  const handleRoleFilterChange = useCallback(
    (e) => setRoleFilter(e.target.value),
    []
  );
  const limpiarFiltrados = useCallback(() => {
    setUserNameFilter("");
    setRoleFilter("");
  }, []);

  const clienteVinculado = useCallback(
    (id_usuario) => clientes.some((dato) => dato.id_usuario === id_usuario),
    [clientes]
  );

  const consultorVinculado = useCallback(
    (id_usuario) => consultores.some((dato) => dato.id_usuario === id_usuario),
    [consultores]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/usuario/${id}`
        );
        if (response.status === 200) {
          setUsers((prev) => {
            const newDatos = prev.filter((u) => u.id_usuario !== id);
            const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;
            if (page > totalPages) setPage(Math.max(0, totalPages));
            return newDatos;
          });
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
        setError("Error al eliminar el usuario");
      }
    },
    [page, rowsPerPage, setUsers]
  );

  const openConfirmation = useCallback((data) => {
    setOpen(true);
    setData(data);
  }, []);

  const handleUsuarioPropio = useCallback(() => {
    handleClose();
    setEsUsuarioPropio(true);
    setOpenDialogAdvertencia(true);
  }, [handleClose]);

  return {
    // Estados
    open,
    dialogOpen,
    showFilters,
    page,
    rowsPerPage,
    userNameFilter,
    roleFilter,
    openDialogAdvertenciaCliente,
    openDialogAdvertenciaConsultor,
    esUsuarioPropio,
    openDialogAdvertencia,
    error,
    editIIdx,
    data,

    // Setters
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertenciaCliente,
    setOpenDialogAdvertenciaConsultor,
    setOpenDialogAdvertencia,

    // Handlers
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUserNameFilterChange,
    handleRoleFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleUsuarioPropio,

    // Helpers
    nombreRol,
    clienteVinculado,
    consultorVinculado,

    // Data
    paginatedData,
    filteredData,
  };
}
