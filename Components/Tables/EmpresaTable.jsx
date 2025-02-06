import styles from "../../styles/Home.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import FormDialog from "../Forms/FormDialog";
import EmpresaForm from "../Forms/EmpresaForm";
import { useEmpresaTable } from "./hooks/useEmpresaTable";

function EmpresaTable({ empresas, setEmpresas, cargando, uebs }) {
  const {
    page,
    rowsPerPage,
    open,
    data,
    dialogOpen,
    showFilters,
    handleCloseForm,
    handleCancelI,
    nameFilter,
    editIIdx,
    openDialogAdvertencia,
    error,
    filteredData,
    paginatedData,
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertencia,
    handleChangePage,
    handleChangeRowsPerPage,
    setNameFilter,
    handleDelete,
    openConfirmation,
    empresaUpdate,
    vinculado,
    handleClose,
    handleCloseDialogAdvertencia,
  } = useEmpresaTable({ empresas, setEmpresas, uebs });
  if (cargando) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={cargando}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* Renderizar las empresas aquí */}
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.divTableInter}>
          <div>
            <div className={styles.divIconH2}></div>
            <TableContainer component={Paper} className={styles.table}>
              <div className={styles.btnNuevoContent}>
                <Button
                  className={styles.btn}
                  onClick={() => setDialogOpen(true)}
                >
                  Nuevo +
                </Button>

                <FormDialog
                  open={dialogOpen}
                  onClose={handleCloseForm}
                  onSave={handleCloseForm}
                  onCancel={handleCloseForm}
                  FormComponent={EmpresaForm}
                  setEmpresas={setEmpresas}
                  empresas={empresas}
                />
              </div>

              {empresas.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5> No hay Empresas</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.spacing}>Nombre</TableCell>
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedData.map((empresa) => (
                      <TableRow
                        key={empresa.id_empresa}
                        className={styles.trStyle}
                      >
                        <TableCell className={styles.tdStyle}>
                          {empresa.nombre_empresa}
                        </TableCell>
                        <TableCell className={styles.tdStyleIcon}>
                          {empresa.cargar_empresa === false && (
                            <>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    empresas.findIndex(
                                      (e) => e.id_empresa === empresa.id_empresa
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  vinculado(empresa.id_empresa)
                                    ? setOpenDialogAdvertencia(true)
                                    : openConfirmation(empresa.id_empresa)
                                }
                                className={styles.faIcon}
                              />
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        className={styles.tablePagination}
                        rowsPerPageOptions={[4, 5, 10]}
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Filas por página:"
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              )}

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                  <p>¿Está seguro de eliminar esta empresa?</p>
                  {error && <Alert severity="error">{error}</Alert>}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDelete(data)}>Aceptar</Button>
                  <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openDialogAdvertencia}
                onClose={handleCloseDialogAdvertencia}
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar una empresa que ya esté vinculada a una
                  UEB
                  <div className={styles.botonAlert}>
                    <Button onClick={handleCloseDialogAdvertencia}>
                      Aceptar
                    </Button>
                  </div>
                </Alert>
              </Dialog>

              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                onSave={handleCancelI}
                onCancel={handleCancelI}
                FormComponent={EmpresaForm}
                setEmpresas={setEmpresas}
                empresas={empresas}
                empresa={empresas[editIIdx]}
              />
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default EmpresaTable;
