import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";
import data from "../../public/structure.json";

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
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(user ? user.name : "");
  const [userName, setUserName] = useState(user ? user.user_name : "");
  const [password, setPassword] = useState(user ? user.password : "");

  const rol = user ? roles.find((role) => (user.role_id === role.id )) : "";
  const roleName = rol ? rol.name_role : "Rol no encontrado";
  const [role, setRole] = useState(
    user
      ? {  
          label: roleName,
          value: user.idRole,
        }
      : ""
  );

  const rolesOptions =
    roles &&
    roles.map((item) => ({
      value: item.id,
      label: item.name_role,
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
    setType(user ? "editar" : "crear");
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      id: user ? user.id : users.length + 1,
      user_name: data.userName,
      name: data.name,  
      role_id: data.role.value,
      password: data.password,
    };

    setUsers(user ? updatedRow : (prevData) => [...prevData, updatedRow]);


    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
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
            <Input
              className={`${styles.inputForm}  ${
                errors.name ? "is-invalid" : ""
              }`}
              type="text"
              id="name"
              {...register("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nombre"
            />
            <div className={styles.error}>{errors.name?.message}</div>
          </div>
          <div>
            <Input
              className={`${styles.inputForm}  ${
                errors.userName ? "is-invalid" : ""
              }`}
              type="text"
              id="userName"
              {...register("userName")}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Usuario"
            />
            <div className={styles.error}>{errors.userName?.message}</div>
          </div>
        
        </div>
        <div className={styles.inputGroup}>
        <div>
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
                  placeholder="Rol"
                />
              )}
            />
            {errors.role && (
              <div className={styles.error}>Seleccione un rol.</div>
            )}
          </div>
          <div>
            <Input
              className={`${styles.inputForm}  ${
                errors.password ? "is-invalid" : ""
              }`}
              type="password"
              id="password"
              {...register("password")}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Contraseña"
            />
            <div className={styles.error}>{errors.password?.message}</div>
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
