import React from "./react.ts";

type Color = "light" | "dark" | "primary" | "accent" | "surface" | "warning";

interface ThemeContextHandle {
  getClassname: (background: Color, level: 0 | 1 | 2) => string;
}

const ThemeContext = React.createContext<ThemeContextHandle | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const value = React.useMemo(() => ({
    getClassname: (bg: Color, level: 0 | 1 | 2) => {
      const text = bg === "light" || bg === "surface" ? "dark" : "light";
      return `text-${text}-${level} bg-${bg}-${level}`;
    },
  }), []);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextHandle {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return context;
}
