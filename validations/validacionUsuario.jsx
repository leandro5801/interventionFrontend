import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  nombre_usuario: Yup.string().required("Ingrese un nombre."),
  contraseña: Yup.string()
    .required("Ingrese una contraseña.")
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número."
    ),
  role: Yup.object().shape({
    value: Yup.string().required("Seleccione un rol."),
    label: Yup.string().required("Seleccione un rol."),
  }),
});
