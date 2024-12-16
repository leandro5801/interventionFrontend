// theme.js
import { createTheme } from "@mui/material/styles";
import { getFontFamily } from "./getFonts";

export const createCustomTheme = (font, mode) => {
  return mode
    ? createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#0099cc", // Color primario oscuro
          },
          secondary: {
            main: "#4be35a", // Color secundario oscuro
          },
          background: {
            default: "#121716", // Fondo oscuro
            paper: "#181a1c", // Fondo de papel oscuro
          },
          text: {
            primary: "#ffffff", // Texto claro en modo oscuro
            secondary: "#dddddd", // Texto secundario claro
          },
        },
        typography: { fontFamily: getFontFamily(font) },
        components: {
          MuiButton: {
            defaultProps: {
              variant: "contained", // Establece el estilo por defecto como outlined
            },
          },
          MuiInput: {
            styleOverrides: {
              root: {
                color: "#ffffff", // Color de texto en modo oscuro
              },
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: {
                color: "white",
                backgroundColor: "#181a1c", // Color de fondo en modo oscuro
                "&:hover": {
                  backgroundColor: "#202326", // Color de fondo al pasar el mouse en modo oscuro
                },
                "&.Mui-focused": {
                  backgroundColor: "#202326", // Color de fondo cuando está enfocado en modo oscuro
                },
              },
            },
          },
          MuiTable: {
            styleOverrides: {
              root: {
                backgroundColor: "#181a1c", // Fondo de la tabla en modo oscuro
                color: "#ffffff", // Color de texto en modo oscuro
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: "1px solid #444", // Estilo de borde en modo oscuro
              },
            },
          },
        },
      })
    : createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#007e9e",
          },
          secondary: {
            main: "#4beeee",
          },
          background: {
            default: "#ffffff",
            paper: "#f0f0f0",
          },
        },
        typography: { fontFamily: getFontFamily(font) },
        components: {
          MuiButton: {
            defaultProps: {
              variant: "contained", // Establece el estilo por defecto como outlined
            },
          },
          MuiInput: {
            styleOverrides: {
              root: {
                color: "#000000", // Color de texto en modo claro
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: "#000000", // Color del label en estado normal
                "&.Mui-focused": {
                  color: "#000000", // Color del label cuando está enfocado
                },
                "&.MuiFormLabel-filled": {
                  color: "#000000", // Color del label cuando está en estado "shrink"
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                "&.Mui-focused .MuiInputLabel-root": {
                  color: "#ffffff", // Color del label cuando el Select está enfocado
                },
              },
            },
          },
        },
      });
};
