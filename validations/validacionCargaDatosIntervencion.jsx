import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  proyecto: Yup.object().shape({
    label: Yup.string().required("Seleccione un Proyecto"),
    value: Yup.string().required("Seleccione un Proyecto"),
  }),
});
