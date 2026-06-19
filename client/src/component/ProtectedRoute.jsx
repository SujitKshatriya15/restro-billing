import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // jwt exp is in seconds
    return decoded.exp > now;
  } catch (err) {
    return false; // malformed token
  }
}

function ProtectedHome({ children }) {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    localStorage.removeItem("token"); // clean up expired/bad token
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedHome;