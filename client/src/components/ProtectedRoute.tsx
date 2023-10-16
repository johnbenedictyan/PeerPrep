import { useContext } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

import { NotificationContext } from "../context/NotificationContext";
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
  const { addNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  if (!user) {
    addNotification({
      type: "error",
      message: "Please Sign In to view this page",
    });
    navigate("/sign-in");
    return <p>Redirecting...</p>;
  }

  if (!(permissionRole in user.roles)) {
    navigate("/sign-in");
    return <p>Redirecting...</p>;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
