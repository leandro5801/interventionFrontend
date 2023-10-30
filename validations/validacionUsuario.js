import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre."),
  userName: Yup.string().required("Ingrese un usuario."),
  password: Yup.string()
  .required("Ingrese una contraseña.")
  .min(6, "La contraseña debe tener al menos 6 caracteres."),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
  // ),
  role:  Yup.object().shape({
    value: Yup.string().required("Seleccione un rol."),
    label: Yup.string().required("Seleccione un rol."),
  }),
});
