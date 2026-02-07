import React, { type ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { useAtomValue } from "jotai";
import { authAtom } from "../../atoms/auth";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const auth = useAtomValue(authAtom);

  if (!auth.isLoggedIn) {
    return <Navigate to="/auth/checkEmail" replace />;
  }

  return <>{children}</>;
}
