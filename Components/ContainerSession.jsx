import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/session/SessionContext";
import { UserContext } from "../contexts/user/UserContext";
import { Backdrop, CircularProgress } from "@mui/material";

export default function ContainerSession({ children }) {
  const { fetchSession } = useContext(SessionContext);
  const { user } = useContext(UserContext);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadSession = async () => {
      console.log(user.id_session);
      if (user.id_session) {
        await fetchSession(user.id_session); // Wait for fetchSession to complete
      }
      setIsLoading(false); // Set loading to false after fetchSession completes
    };
    loadSession();
  }, [user.id_session]);

  return loading ? null : children;
}
