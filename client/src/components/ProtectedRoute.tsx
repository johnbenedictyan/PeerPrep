import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { NotificationContext } from "../context/NotificationContext";
import { FullUser } from "../interfaces/User";
import { AuthContext } from "../context/FirebaseAuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissionRole: string;
}

function ProtectedRoute({ permissionRole, children }: ProtectedRouteProps) {
  const { addNotification } = useContext(NotificationContext);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const checkUser = useCallback(() => {
    if (!currentUser) {
      addNotification({
        type: "error",
        message: "Please Sign In to view this page",
      });
      navigate("/sign-in");
      return;
    }

    if (currentUser.roles.indexOf(permissionRole) === -1) {
      addNotification({
        type: "error",
        message: "You do not have access to view this page",
      });
      navigate("/sign-in");
    }
  }, [addNotification, navigate, permissionRole, currentUser]);

  useEffect(() => {
    setTimeout(checkUser, 2000);
    setIsLoading(false);
  }, [checkUser]);

  return <div>{isLoading ? <p>Loading</p> : children}</div>;
}

export default ProtectedRoute;
