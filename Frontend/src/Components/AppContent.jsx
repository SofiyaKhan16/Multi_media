import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Pages/Account/Login";
import Home from "../Pages/Home/Home";
import AppLoader from "./AppLoader";
import { getCookie } from "../api/cookies";
import Upload from "../Pages/Upload/Upload";

function AppContent() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie('jwtToken');
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<AppLoader />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default AppContent;