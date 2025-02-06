import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre."),
  description: Yup.string().required("Ingrese una descripción."),
  // consultor: Yup.string().required("Seleccione un consultor."),
  /* fecha: Yup.date() // Usa Yup.date() para validar fechas
    .required("Seleccione una fecha.")
    .typeError("La fecha debe tener el formato YYYY-MM-DD"), // Mensaje personalizado, */
  fecha: Yup.string()
    .required("Seleccione una fecha.")
    .matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      "Formato debe ser YYYY-MM-DD"
    ),
  classification: Yup.string().required("Seleccione una clasificación."),
  intervention: Yup.string().required("Seleccione una intervención."),
  follow: Yup.string().required("Seleccione una opción."),
});
