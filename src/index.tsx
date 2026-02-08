import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/styles.css";
import { App } from "./app";

const container = document.getElementById("root");
if (!container) {
  throw new Error("No se encontro el elemento root");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
