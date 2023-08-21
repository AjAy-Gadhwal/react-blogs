import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const AdminAuthGuard = ({ children }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const checkAuth = useCallback(async () => {
    if (!authContext.isAuth && authContext.role !== 'admin') {
      navigate(`/login`);
    }

    setStatus(true);
    return;
  }, [navigate, authContext.isAuth, authContext.role]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, authContext.isAuth]);

  return status ? <>{children}</> : <></>;
}

export default AdminAuthGuard;