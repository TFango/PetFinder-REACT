//Essencial
import React from "react";
import { Routes, Route } from "react-router-dom";

//Layout
import { Layout } from "../components/layout";

//Pages
import { Home } from "../pages/home";
import { PetsNearby } from "../pages/petsNearby";
import { ReportInfoPet } from "../pages/reportInfoPet";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pets/nearby" element={<PetsNearby />} />
        <Route path="pets/reportInfo" element={<ReportInfoPet />} />
      </Route>
    </Routes>
  );
}
