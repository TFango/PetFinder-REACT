import { useState } from "react";
import { apiFetch } from "../lib/api";

import { authWithStorageAtom } from "../atoms/auth";
import { useAtom } from "jotai";

import { authAtom } from "../atoms/auth";

import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/user";

export function useAuth() {
  const navigate = useNavigate();

  const [auth, setAuth] = useAtom(authWithStorageAtom);
  const [, setUser] = useAtom(userAtom);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkEmail(email: string) {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch("/auth/email", {
        method: "POST",
        body: { email },
      });

      if (data.exists) {
        navigate("/auth/login");
      } else {
        navigate("/auth/register");
      }
    } catch (err: any) {
      setError("Error al verificar el email");
    } finally {
      setLoading(false);
    }
  }

  async function register(
    email: string,
    password: string,
    passConfirm: string,
    name: string,
  ) {
    try {
      setLoading(true);
      setError(null);

      if (password !== passConfirm) {
        throw new Error("Las contraseñas deben ser iguales");
      }

      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: { name, email, password },
      });

      setAuth({
        email: email,
        token: data.token,
        isLoggedIn: true,
      });

      const me = await apiFetch("/me");
      const { email: _e, ...userData } = me;
      setUser(userData);

      navigate("/");
    } catch (err: any) {
      setError("Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      setAuth({
        email: email,
        token: data.token,
        isLoggedIn: true,
      });

      const me = await apiFetch("/me");
      const { email: _e, ...userData } = me;
      setUser(userData);

      navigate("/");
    } catch (err: any) {
      setError("Error al loguearse");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setAuth({
      email: "",
      token: null,
      isLoggedIn: false,
    });
    localStorage.removeItem("auth");

    navigate("/");
  }

  return { checkEmail, register, logout, login, loading, error };
}
