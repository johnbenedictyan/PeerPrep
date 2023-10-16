import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (!user) {
      addNotification({
        type: "error",
        message: "Please Sign In to view this page",
      });
      navigate("/sign-in");
      return;
    }

    if (!(permissionRole in user.roles)) {
      addNotification({
        type: "error",
        message: "You do not have access to view this page",
      });
      navigate("/sign-in");
    }
  }, [addNotification, navigate, permissionRole, user]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
