import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/styles.css";

import { AppRoutes } from "./router/router";

const container = document.getElementById("root");
if (!container) {
  throw new Error("No se encontro el elemento root");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);
