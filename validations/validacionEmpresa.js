import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese el nombre de la empresa."),
});
