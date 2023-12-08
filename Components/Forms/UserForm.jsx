import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionUsuario";

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

export default function UserForm({
  setUsers,
  setRoles,
  users,
  user,
  roles,
  nombreRol,
  onCancel,
  onSave,
}) {
  const [nombre_usuario, setUserName] = useState(
    user ? user.nombre_usuario : ""
  );
  const [contraseña, setcontraseña] = useState(user ? user.contraseña : "");

  const [role, setRole] = useState(
    user
      ? {
          label: nombreRol(user.id_rol),
          value: user.id_rol,
        }
      : ""
  );

  const validarNombresIguales = (nombre_usuario, id_original) => {
    const nombre = users.find(
      (i) =>
        i.id_usuario !== id_original &&
        nombre_usuario.toLowerCase() === i.nombre_usuario.toLowerCase()
    );
    const nombreRepetido = nombre ? true : false;
    return nombreRepetido;
  };

  const rolesOptions =
    roles &&
    roles.map((item) => ({
      value: item.id_rol,
      label: item.nombre_rol,
    }));

  const handleRolesChange = (newValue) => {
    setRole({ label: newValue.label, value: newValue.value });
  };
  const defaultValues = {
    role: role,
  };

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };

  // get functions to build form with useForm() hook
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState,
    setError,
  } = useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("crear");

  function onSubmit(data) {
    const nombreRepetido = validarNombresIguales(
      data.nombre_usuario,
      user ? user.id_usuario : null
    );
    if (nombreRepetido) {
      setError("nombre_usuario", {
        type: "manual",
        message: "El nombre de usuario ya existe",
      });
    } else {
      setOpen(true);
      setFormData(data);
      setType(user ? "editar" : "crear");
    }
  }

  const [errorAxios, setErrorAxios] = useState(null);
  async function createUsuario(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuario",
        updatedRow
      );
      if (response.status === 201) {
        // Actualiza el estado para añadir la nueva usuario al frontend
        setUsers([...users, response.data]);
      } else {
        throw new Error("Error al crear el usuario");
      }
    } catch (error) {
      console.error(error);
      setErrorAxios(
        "Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editUsuario(id_usuario, usuarioData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/usuario/${id_usuario}`,
        usuarioData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setUsers(
          users.map((user) =>
            user.id_usuario === id_usuario ? response.data : user
          )
        );
      } else {
        throw new Error("Error al editar el usuario");
      }
    } catch (error) {
      console.error(error);
      setErrorAxios(
        "Hubo un problema al editar el usuario. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      // id_usuario: user ? user.id : users.length + 1,
      nombre_usuario: data.nombre_usuario,
      id_rol: parseInt(data.role.value),
      contraseña: data.contraseña,
    };

    user ? editUsuario(user.id_usuario, updatedRow) : createUsuario(updatedRow);

    onSave();

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Usuario</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <div>
          <InputLabel>Nombre de usuario</InputLabel>
            <Input
              className={`${styles.inputForm}  ${
                errors.nombre_usuario ? "is-invalid" : ""
              }`}
              type="text"
              id="nombre_usuario"
              {...register("nombre_usuario")}
              value={nombre_usuario}
              onChange={(event) => setUserName(event.target.value)}
              // placeholder="Usuario"
            />

            <div className={styles.error}>{errors.nombre_usuario?.message}</div>
          </div>
          <div>
          <InputLabel>Rol</InputLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="role"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.role ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleRolesChange(selectedOption);
                    setValue("role", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={rolesOptions}
                  maxMenuHeight={120}
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.role && (
              <div className={styles.error}>Seleccione un rol.</div>
            )}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div>
          <InputLabel>Contraseña</InputLabel>
            <Input
              className={`${styles.inputForm}  ${
                errors.contraseña ? "is-invalid" : ""
              }`}
              type="password"
              id="contraseña"
              {...register("contraseña")}
              value={contraseña}
              onChange={(event) => setcontraseña(event.target.value)}
              // placeholder="Contraseña"
            />
            <div className={styles.error}>{errors.contraseña?.message}</div>
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
