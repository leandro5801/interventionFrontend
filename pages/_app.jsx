import "../styles/globals.css";
import Container from "../Components/Container";
import Header from "../Components/Header";
import Wrap from "../Components/Wrap";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "../contexts/session/SessionContext";
import UserProvider from "../contexts/user/UserContext";
import { NotificationProvider } from "../contexts/notification/NotificationContext";
import ContainerSession from "../Components/ContainerSession";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SessionProvider>
        <Wrap>
          {Component.name === "Login" ? (
            <Component {...pageProps} />
          ) : (
            <>
              <NotificationProvider>
                <ContainerSession>
                  <Header />
                  <Container>
                    <Component {...pageProps} />
                  </Container>
                </ContainerSession>
              </NotificationProvider>
            </>
          )}
        </Wrap>
      </SessionProvider>
    </UserProvider>
  );
}
export default MyApp;
