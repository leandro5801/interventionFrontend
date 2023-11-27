import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Prueba() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const token = Cookies.get("access_token");
        const response = await axios.get(
          "http://localhost:3000/api/autenticacion/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getProfile();
  }, []);
  
  return (
    <div>
      <h3> Prueba</h3>
      <button onClick={() => getProfile()}>getProfile</button>
    </div>
  );
}
