import "../styles/globals.css";
import Container from "../Components/Container";
import Header from "../Components/Header";

import Wrap from "../Components/Wrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "../contexts/session/SessionContext";
import UserProvider from "../contexts/user/UserContext";
import { NotificationProvider } from "../contexts/notification/NotificationContext";
import { ThemeProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  if (Component.name === "Login") {
    // Si es "Login", renderiza el componente sin el contenedor
    return (
      <ThemeProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    );
  }
  // Si no es "Login", renderiza el componente con el contenedor
  return (
    <UserProvider>
      <SessionProvider>
        <Wrap>
          <NotificationProvider>
            <Header />
            <Container>
              <Component {...pageProps} />
            </Container>
          </NotificationProvider>
        </Wrap>
      </SessionProvider>
    </UserProvider>
  );
}

export default MyApp;
