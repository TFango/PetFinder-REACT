//Essencial
import React from "react";
import { Routes, Route } from "react-router-dom";

//Layout
import { Layout } from "../components/layout";

//Pages
import { Home } from "../pages/home";
import { CheckEmail } from "../pages/checkEmail";
import { Register } from "../pages/register";
import { Login } from "../pages/login";
import { UserMenu } from "../pages/userMenu";
import { MyPetsReport } from "../pages/myPetsReport";
import { ReportPet } from "../pages/reportPet";
import { MyData } from "../pages/myData";
import { ChangePassword } from "../pages/changePassword";
import { EditPet } from "../pages/editPet";
import { PetsEmpty } from "../pages/petsEmpty";
import { PetsNearby } from "../pages/petsNearby";

import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth/checkEmail" element={<CheckEmail />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="user/myData" element={<MyData />} />
        <Route path="user/changePassword" element={<ChangePassword />} />
        <Route path="pets/:petId" element={<EditPet />} />
        <Route path="pets/empty" element={<PetsEmpty />} />
        <Route path="pets/nearby" element={<PetsNearby />} />
        //Rutas protegidas
        <Route
          path="user/menu"
          element={
            <ProtectedRoute>
              <UserMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="pets/report"
          element={
            <ProtectedRoute>
              <ReportPet />
            </ProtectedRoute>
          }
        />
        <Route
          path="pets/myPetsReport"
          element={
            <ProtectedRoute>
              <MyPetsReport />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
