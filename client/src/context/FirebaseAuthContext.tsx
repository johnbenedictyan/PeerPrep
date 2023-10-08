import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import UserController from "../controllers/user/user.controller";
import { FullUser, User } from "../interfaces/User";
import { SignOutUser, userStateListener } from "../util/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  currentUser: {} as FullUser | null,
  setCurrentUser: (_user: FullUser) => {},
  signOut: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FullUser | null>(null);
  const navigate = useNavigate();
  const ctrlInstance = useMemo(() => new UserController(), []);

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        // setCurrentUser(user);
        console.log(user.uid);
        ctrlInstance
          .getUser(user.uid)
          .then((userFromDb: User) => {
            if (!userFromDb) {
              return;
            }

            setCurrentUser({
              ...userFromDb,
              ...user,
            });
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    });
    return unsubscribe;
  }, [setCurrentUser, ctrlInstance]);

  // As soon as setting the current user to null,
  // the user will be redirected to the home page.
  const signOut = useCallback(() => {
    SignOutUser();
    setCurrentUser(null);
    navigate("/");
  }, [setCurrentUser, navigate]);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      signOut,
    }),
    [currentUser, setCurrentUser, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
