import { apiFetch } from "../lib/api";

import { useState } from "react";

import { useAtom } from "jotai";

import { userAtom } from "../atoms/user";

import { useNavigate } from "react-router-dom";

export function useUser() {
  const navigate = useNavigate();

  const [, setUser] = useAtom(userAtom);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getMe() {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch("/me");
      setUser(data);
      console.log("data guardada", data);
    } catch (err: any) {
      setError("Error al guarda la data");
    } finally {
      setLoading(false);
    }
  }

  async function updateMe(newName?: string, newLocation?: string) {
    try {
      setLoading(true);
      setError(null);

      const body: any = {};
      if (newName) body.newName = newName;
      if (newLocation) body.newLocation = newLocation;

      const data = await apiFetch("/me", {
        method: "PATCH",
        body,
      });

      const { email, ...userData } = data;

      setUser((prev) => ({
        ...prev,
        ...userData,
      }));
      navigate("/");
    } catch (err: any) {
      setError("Error al modificar la data");
    } finally {
      setLoading(false);
    }
  }

  async function changePassword(newPassword: string) {
    try {
      setLoading(true);
      setError(null);

      console.log();

      await apiFetch("/auth/password", {
        method: "PATCH",
        body: { newPassword },
      });

      navigate("/");
    } catch (erra: any) {
      setError("Error al modificar la contraseña");
    } finally {
      setLoading(false);
    }
  }

  return { getMe, updateMe, changePassword, loading, error };
}
