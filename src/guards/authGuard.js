import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate(`/login`);
    }

    setStatus(true);
    return;
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return status ? <>{children}</> : <></>;
}

export default AuthGuard;