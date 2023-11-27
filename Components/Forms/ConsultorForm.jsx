import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";
import data from "../../public/structure.json";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionConsultor";

//sms de confirmacion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
  InputLabel,
} from "@mui/material";

export default function ConsultorForm({
  setConsultores,
  consultores,
  consultor,
  users,
  onCancel,
  onSave,
}) {
    const nombreUsuario = (id_usuario) => {
        const user = users.find((e) => e.id_usuario === id_usuario);
        const name = user ? user.nombre_usuario : "no se encontro el nombre";
        return name;
      };
  const [name, setName] = useState(consultor ? consultor.nombre_consultor : "");
 
  const [usuario, setUsuario] = useState(
    consultor
      ? {
          label: nombreUsuario(consultor.id_usuario),
          value: consultor.id_usuario,
        }
      : ""
  );

  const consultorIds = consultores.map(consultor => consultor.id_usuario);

  const userOptions =
    users &&
    users.filter((user) => (user.id_rol === 2 || user.id_rol === 3)&& !consultorIds.includes(user.id_usuario)).map((item) => ({
      value: item.id_usuario,
      label: item.nombre_usuario,
    }));
  const handleUsuariosChange = (newValue) => {
    setUsuario({ label: newValue.label, value: newValue.value });
  };
  const defaultValues = {
    user: usuario,
  };

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };

  // get functions to build form with useForm() hook
  const { register, control, setValue, handleSubmit, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("crear");

  function onSubmit(data) {
    // event.preventDefault();
    setOpen(true);
    setFormData(data);
    setType(consultor ? "editar" : "crear");
  }

  const [error, setError] = useState(null);
  async function createConsultor(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/consultor",
        updatedRow
      );
      if (response.status === 201) {
        // Actualiza el estado para añadir la nueva consultor al frontend
        setConsultores([...consultores, response.data]);
      } else {
        throw new Error("Error al crear el consultor");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear el consultor. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editConsultor(id_consultor, consultorData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/consultor/${id_consultor}`,
        consultorData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setConsultores(
          consultores.map((consultor) =>
            consultor.id_consultor === id_consultor ? response.data : consultor
          )
        );
      } else {
        throw new Error("Error al editar el consultor");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar el consultor. Por favor, inténtalo de nuevo."
      );
    }
  }
  const handleConfirm = (data) => {
    const updatedRow = {
      // idConsultor: consultor ? consultor.idConsultor : consultores.length + 1,
      nombre_consultor: data.name,
      id_usuario: parseInt(data.user.value),
    };

    consultor
    ? editConsultor(consultor.id_consultor, updatedRow)
    : createConsultor(updatedRow);

    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Consultor</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <div>
            <Input
              className={`${styles.inputForm}  ${
                errors.name ? "is-invalid" : ""
              }`}
              type="text"
              id="name"
              {...register("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nombre del consultor"
            />
            <div className={styles.error}>{errors.name?.message}</div>
          </div>
          <div>
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="user"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.user ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleUsuariosChange(selectedOption);
                    setValue("user", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={userOptions}
                  maxMenuHeight={120}
                  placeholder="Usuario"
                />
              )}
            />
            {errors.user && (
              <div className={styles.error}>Seleccione un usuario.</div>
            )}
          </div>
        </div>

        <DialogActions>
          <Button type="submit">Aceptar</Button>

          <Button onClick={onCancel}>Cancelar</Button>
        </DialogActions>
        <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
          <DialogTitle>
            {type === "crear" ? "Confirmar creación" : "Confirmar modificación"}
          </DialogTitle>
          <DialogContent>
            <p>
              {type === "crear"
                ? "¿Está seguro de crear este usuario?"
                : "¿Está seguro de modificar el usuario?"}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirm(formData)}>Aceptar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
