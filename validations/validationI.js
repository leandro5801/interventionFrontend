import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ingrese un nombre."),
  description: Yup.string().required("Ingrese una descripción."),
  process:  Yup.object().shape({
    value: Yup.string().required("Seleccione un proceso."),
    label: Yup.string().required("Seleccione un proceso."),
  }),
  ueb: Yup.object().shape({
    value: Yup.string().required("Seleccione una UEB."),
    label: Yup.string().required("Seleccione una UEB."),
  }),
  structure: Yup.object().shape({
    value: Yup.string().required("Seleccione una opción"),
    label: Yup.string().required("Seleccione una opción"),
  }),
  area: Yup.object().shape({
    value: Yup.string().required("Seleccione un área."),
    label: Yup.string().required("Seleccione un área."),
  }),
  consultor: Yup.object().shape({
    value: Yup.string().required("Seleccione un consultor."),
    label: Yup.string().required("Seleccione un consultor."),
  }),
  worker: Yup.object().shape({
    value: Yup.string().required("Seleccione un trabajador."),
    label: Yup.string().required("Seleccione un trabajador."),
  }),
  start: Yup.string()
    .required("Seleccione una fecha de inicio.")
    .matches(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]0[1-9]|1[012])$/,
      "La fecha de inicio debe ser una fecha válida con el formato AAAA-MM-DD"
    ),
    end: Yup
    .string()
    .required("Seleccione una fecha de fin.")
    .test("is-after-start", "La fecha de fin debe ser al menos un día después de la fecha de inicio", function (value) {
      const { start } = this.parent;
      return !start || !value || new Date(value) >= new Date(start).setDate(new Date(start).getDate() + 1);
    })
    .matches(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      "La fecha de inicio debe ser una fecha válida con el formato AAAA-MM-DD"
    ),
});
