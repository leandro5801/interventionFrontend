import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre."),
  description: Yup.string().required("Ingrese una descripción."),
  consultor: Yup.string().required("Seleccione un consultor."),
  classification: Yup.string().required("Seleccione una clasificación."),
});