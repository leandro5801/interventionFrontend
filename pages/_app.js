import '../styles/globals.css';
import { useState, useEffect } from "react";
import Dashboard from "./Home/Dashboard";
import Login from "./Home/Login/Login";


function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState();
 
  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
  // <Component {...pageProps} />
  
}

export default MyApp

