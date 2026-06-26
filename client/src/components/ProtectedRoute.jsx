import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // or from context/state

  if (!token) {
    return <Navigate to="/login" />; // redirect if not logged in
  }

  return children;
}

export default ProtectedRoute;