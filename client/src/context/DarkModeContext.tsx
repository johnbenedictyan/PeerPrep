import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface DarkModeProviderProps {
  children: ReactNode;
}

interface DarkModeContextType {
  isDarkMode: boolean;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
});

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        console.log(event);
        const colorScheme = event.matches ? "dark" : "light";
        console.log(colorScheme);
        setIsDarkMode(colorScheme === "dark");
      });

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  const value = useMemo(() => ({ isDarkMode }), [isDarkMode]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}
