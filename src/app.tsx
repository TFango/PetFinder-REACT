import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/router";
import { useBootstrap } from "./hooks/useBootstrap";

export function App() {
  useBootstrap();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
