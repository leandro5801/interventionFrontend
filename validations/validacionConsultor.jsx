import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre."),
  user:  Yup.object().shape({
    value: Yup.string().required("Seleccione un usuario."),
    label: Yup.string().required("Seleccione un usuario."),
  }),
});
