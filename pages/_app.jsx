import "../styles/globals.css";
import Container from "../Components/Container";
import Header from "../Components/Header";
import { useState, useEffect } from "react";
import Dashboard from "./index";
import Login from "./Login/Login";

function MyApp({ Component, pageProps }) {

  if (Component.name === "Login") {
    // Si es "Login", renderiza el componente sin el contenedor
    return <Component {...pageProps} />;
  }

  // Si no es "Login", renderiza el componente con el contenedor
  return (
    <>
      <Header/>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
