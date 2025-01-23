import React, { useContext, useState } from "react";
import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { createCustomTheme } from "../helpers/theme"; // Importa los temas
import { SessionContext } from "../contexts/session/SessionContext";
import { ToastContainer } from "react-toastify";
export default function Wrap({ children }) {
  const { isDark, font } = useContext(SessionContext);

  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  ) : (
    <ThemeProvider theme={createCustomTheme(font, isDark)}>
      <CssBaseline />
      <ToastContainer
        // bodyStyle={{ backgroundColor: "transparent" }}
        position="top-right" // Posición de la notificación
        autoClose={5000} // Tiempo en milisegundos antes de que se cierre automáticamente
        hideProgressBar={false} // Muestra la barra de progreso
        closeOnClick // Cierra la notificación al hacer clic
        pauseOnHover // Pausa el temporizador al pasar el mouse
        draggable // Permite arrastrar la notificación
        theme={isDark ? "dark" : "light"} // Tema de la notificación
      />
      {children}
    </ThemeProvider>
  );
}
