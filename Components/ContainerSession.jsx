import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/session/SessionContext";
import { UserContext } from "../contexts/user/UserContext";
import { Backdrop, CircularProgress } from "@mui/material";
import useLocalStorage from "../helpers/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ContainerSession({ children }) {
  const { fetchSession } = useContext(SessionContext);
  const { get } = useLocalStorage();
  const { setUser } = useContext(UserContext);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const loadSession = async () => {
      const token = get("access_token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/autenticacion/profile",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            console.log(response.data);
            const user = response.data.user;
            setUser(user);
            fetchSession(user.id_usuario);
          } else {
            console.log("aqui");

            router.push("/Login/Login");
          }
        } catch (error) {
          console.log(error);

          router.push("/Login/Login");
        }
      }
      /* console.log(user.id_session); */

      /*  else await fetchSession(3); // Wait for fetchSession to complete */
      setIsLoading(false); // Set loading to false after fetchSession completes
    };
    loadSession();
  }, []);

  return loading ? null : children;
}
