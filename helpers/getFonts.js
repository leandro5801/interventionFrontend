import { Fuente } from "../enums/Fuente.enum";

export const getFontFamily = (font) => {
  switch (font) {
    case Fuente.Roboto:
      return "Roboto";
    case Fuente.Arial:
      return "Arial";
    case Fuente.Courier_New:
      return "Courier New";
    case Fuente.Times_New_Roman:
      return "Times New Roman";
    case Fuente.Georgia:
      return "Georgia";
    case Fuente.Verdana:
      return "Verdana"; // Añadido
    case Fuente.Comic_Sans_MS:
      return "Comic Sans MS"; // Añadido

    default:
      return "Roboto"; // Fuente por defecto
  }
};
