/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "./deps/react.ts";

import AppRouter from "./app/AppRouter.tsx";
import Html from "./app/Html.tsx";
import { ThemeProvider } from "./theme.tsx";

export default function App() {
  return (
    <Html>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </Html>
  );
}
