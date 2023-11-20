import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre para el proyecto."),
  objetivo: Yup.string().required("Ingrese el objetivo."),
  cliente:  Yup.object().shape({
    value: Yup.string().required("Ingrese el cliente."),
    label: Yup.string().required("Ingrese el cliente."),
  }),
  consultores: Yup.array()
  .required("Seleccione al menos un consultor")
  .min(1, 'Seleccione al menos un consultor.'),
});
