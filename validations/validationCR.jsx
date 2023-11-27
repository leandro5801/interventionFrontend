import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre."),
  description: Yup.string().required("Ingrese una descripción."),
  // consultor: Yup.string().required("Seleccione un consultor."),
  fecha: Yup.string()
  .required("Seleccione una fecha.")
  .matches(
    /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]0[1-9]|1[012])$/,
    "La fecha debe tener el formato AAAA-MM-DD"
  ),
  classification: Yup.string().required("Seleccione una clasificación."),
  intervention: Yup.string().required("Seleccione una intervención."),
  follow: Yup.string().required("Seleccione una opción."),
});
