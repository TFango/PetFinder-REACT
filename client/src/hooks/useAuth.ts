import { useState } from "react";
import { apiFetch } from "../lib/api";

import { useAtomValue } from "jotai";
import { useAtom } from "jotai";

import { authAtom } from "../atoms/auth";

import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const [auth, setAuth] = useAtom(authAtom);

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

      navigate("/");
    } catch (err: any) {
      setError("Error al loguearse");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setAuth({
      email: null,
      token: null,
      isLoggedIn: false,
    });

    navigate("/");
  }

  return { checkEmail, register, logout, login, loading, error };
}
