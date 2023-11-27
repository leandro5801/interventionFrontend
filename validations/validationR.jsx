import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre."),
  description: Yup.string().required("Ingrese una descripción."),
  // consultor: Yup.object().shape({
  //   value: Yup.string().required("Seleccione un consultor."),
  //   label: Yup.string().required("Seleccione un consultor."),
  // }),
  classification: Yup.object().shape({
    value: Yup.string().required("Seleccione una clasificación."),
    label: Yup.string().required("Seleccione una clasificación."),
  }),
  follow: Yup.string().required("Seleccione una opción."),
});
