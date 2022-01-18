import {
  react_default
} from "./chunk-SQXXAXP7.js";

// src/client/theme.tsx
var ThemeContext = react_default.createContext(null);
function ThemeProvider({ children }) {
  const value = react_default.useMemo(() => ({
    getClassname: (bg, level) => {
      const text = bg === "light" || bg === "surface" ? "dark" : "light";
      return `text-${text}-${level} bg-${bg}-${level}`;
    }
  }), []);
  return /* @__PURE__ */ react_default.createElement(ThemeContext.Provider, {
    value
  }, children);
}
function useTheme() {
  const context = react_default.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return context;
}

export {
  ThemeProvider,
  useTheme
};
//# sourceMappingURL=chunk-3IGTP4YB.js.map
