import { Navigate } from "react-router-dom";
import { FullUser } from "../interfaces/User";

interface ProtectedRouteProps {
  user: FullUser | null;
  children: React.ReactNode;
  permissionRole: string;
}

function ProtectedRoute({
  user,
  permissionRole,
  children,
}: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (!(permissionRole in user.roles)) {
    return <Navigate to="/sign-in" />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
