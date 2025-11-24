import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  console.log("isLoggedIn", isLoggedIn); // Logging as false, even after logging in

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
