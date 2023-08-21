import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginGuard = ({ children }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const checkAuth = useCallback(async () => {
    if (authContext.isAuth) {
      navigate(`/`);
    }

    setStatus(true);
    return;
  }, [navigate, authContext.isAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, authContext.isAuth]);

  return status ? <>{children}</> : <></>;
}

export default LoginGuard;