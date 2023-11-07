import "../styles/globals.css";
import Container from "../Components/Container";
import Header from "../Components/Header";
import { useState, useEffect } from "react";
import Dashboard from "./index";
import Login from "./Home/Login/Login";
// import IntervencionPage from "./IntervencionPage";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          {}
          <>
            <>
              <Header setIsAuthenticated={setIsAuthenticated} />
            </>
            <>
              <Container>
                {/* <Dashboard setIsAuthenticated={setIsAuthenticated} /> */}
                <Component {...pageProps} />
              </Container>
            </>
          </>
        </>
      )}
    </>
  );
}

export default MyApp;
