import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese el nombre del área."),
  empresa:  Yup.object().shape({
    value: Yup.string().required("Seleccione una empresa."),
    label: Yup.string().required("Seleccione una empresa."),
  }),
  ueb:  Yup.object().shape({
    value: Yup.string().required("Seleccione una ueb."),
    label: Yup.string().required("Seleccione una ueb."),
  }),
  direccion:  Yup.object().shape({
    value: Yup.string().required("Seleccione una dirección."),
    label: Yup.string().required("Seleccione una dirección."),
  }),
 
});
