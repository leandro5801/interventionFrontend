import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  proyecto: Yup.string().required("Seleccione un proyecto."),
  intervention: Yup.string().required("Seleccione una intervención."),
});
