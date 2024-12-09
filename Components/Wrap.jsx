import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { createCustomTheme } from "../helpers/theme"; // Importa los temas
import { SessionContext } from "../contexts/session/SessionContext";
import { UserContext } from "../contexts/user/UserContext";
export default function Wrap({ children }) {
  const { isDark, fetchSession, font, session } = useContext(SessionContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(Cookies.get("id_session"));

    session.id === ""
      ? fetchSession(
          user ? user.id_session : JSON.parse(Cookies.get("id_session"))
        )
      : null;
    setIsLoading(false);
  }, []);

  return (
    <ThemeProvider theme={createCustomTheme(font, isDark)}>
      <CssBaseline />
      {isLoading ? (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}
