//Essencial
import React from "react";
import { Routes, Route } from "react-router-dom";

//Layout
import { Layout } from "../components/layout";

//Pages
import { Home } from "../pages/home";
import { AuthEmail } from "../pages/authEmail";
import { Register } from "../pages/register";
import { Login } from "../pages/login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth/authEmail" element={<AuthEmail />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
