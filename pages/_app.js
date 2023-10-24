import "../styles/globals.css";
// import { useState, useEffect } from "react";
// import Dashboard from "./Home/Dashboard";
// import Login from "./Home/Login/Login";
// import IntervencionPage from "./IntervencionPage";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp


// function MyApp() {
//   const [isAuthenticated, setIsAuthenticated] = useState();

//   useEffect(() => {
//     setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
//   }, []);

//   return (
//     <>
//       {!isAuthenticated ? (
//         <Login setIsAuthenticated={setIsAuthenticated} />
//       ) : (
//         <>
//           <Dashboard setIsAuthenticated={setIsAuthenticated} />

          
//         </>
//       )
//       }
//     </>
//   );
// }

// export default MyApp;
