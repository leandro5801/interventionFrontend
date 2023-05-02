import * as Yup from "yup";

export  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Ingrese un nombre."),
    description: Yup.string().required("Ingrese una descripción."),
    process: Yup.string().required("Seleccione un proceso."),
    ueb: Yup.string().required("Seleccione una UEB."),
    structure: Yup.string().required("Seleccione una estructura."),
    area: Yup.string().required("Seleccione un área."),
    consultor: Yup.string().required("Seleccione un consultor."),
    worker: Yup.string().required("Seleccione un trabajador."),
    start: Yup.string()
      .required("Seleccione una fecha de inicio.")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]0[1-9]|1[012])$/,
        "La fecha de inicio debe ser una fecha válida con el formato AAAA-MM-DD"
      ),
    end: Yup.string()
      .required("Seleccione una fecha de fin.")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "La fecha de inicio debe ser una fecha válida con el formato AAAA-MM-DD"
      ),
      
  });
