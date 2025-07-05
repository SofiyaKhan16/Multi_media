import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Pages/Account/Login";
import Home from "../Pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Upload from "../Pages/Upload/Upload";

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppContent;