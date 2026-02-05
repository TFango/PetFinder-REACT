import React from "react";

import { Header } from "../header/index";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
