import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "../api/cookies";

function AppLoader() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = getCookie('jwtToken');
    if (token) {
      navigate('/home', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, location]);
  return null;
}

export default AppLoader;
