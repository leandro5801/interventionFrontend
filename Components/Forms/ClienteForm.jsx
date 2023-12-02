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

export default function ClienteForm({
  setClientes,
  clientes,
  cliente,
  users,
  onCancel,
  onSave,
}) {
  const nombreUsuario = (id_usuario) => {
    const user = users.find((e) => e.id_usuario === id_usuario);
    const name = user ? user.nombre_usuario : "no se encontro el nombre";
    return name;
  };
  const [name, setName] = useState(cliente ? cliente.nombre_cliente : "");

  const [usuario, setUsuario] = useState(
    cliente && cliente.id_usuario
      ? {
          label: nombreUsuario(cliente.id_usuario),
          value: cliente.id_usuario,
        }
      : ""
  );

  const clienteIds = clientes.map((cliente) => cliente.id_usuario);

  const validarNombresIguales = (nombre_cliente, id_original) => {
    const nombre = clientes.find(
      (i) =>
        i.id_cliente !== id_original &&
        nombre_cliente.toLowerCase() === i.nombre_cliente.toLowerCase()
    );
    const nombreRepetido = nombre ? true : false;
    return nombreRepetido;
  };

  const userOptions =
    users &&
    users
      .filter(
        (user) => user.id_rol === 4 && !clienteIds.includes(user.id_usuario)
      )
      .map((item) => ({
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
      data.name,
      cliente ? cliente.id_cliente : null
    );
    if (nombreRepetido) {
      setError("name", {
        type: "manual",
        message: "El nombre del cliente ya existe",
      });
    } else {
      setOpen(true);
      setFormData(data);
      setType(cliente ? "editar" : "crear");
    }
  }

  const [errorAxios, setErrorAxios] = useState(null);
  async function createCliente(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cliente",
        updatedRow
      );
      if (response.status === 201) {
        // Actualiza el estado para añadir la nueva cliente al frontend
        setClientes([...clientes, response.data]);
      } else {
        throw new Error("Error al crear el cliente");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear el cliente. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editCliente(id_cliente, clienteData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/cliente/${id_cliente}`,
        clienteData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setClientes(
          clientes.map((cliente) =>
            cliente.id_cliente === id_cliente ? response.data : cliente
          )
        );
      } else {
        throw new Error("Error al editar el cliente");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar el cliente. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      // idCliente: cliente ? cliente.idCliente : clientes.length + 1,
      nombre_cliente: data.name,
      id_usuario: data.user ? data.user.value : null,
    };

    cliente
      ? editCliente(cliente.id_cliente, updatedRow)
      : createCliente(updatedRow);

    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>cliente</DialogTitle>
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
              placeholder="Nombre del cliente"
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
                    setValue("user", selectedOption.value);
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
                ? "¿Está seguro de crear este cliente?"
                : "¿Está seguro de modificar el cliente?"}
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
