import { useEffect } from "react";
import { useAtomValue, useAtom } from "jotai";
import { authAtom } from "../atoms/auth";
import { userAtom } from "../atoms/user";
import { apiFetch } from "../lib/api";

export function useBootstrap() {
  const auth = useAtomValue(authAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    async function bootstrap() {
      if (!auth.token) return;

      try {
        const data = await apiFetch("/me");
        const { email, ...userData } = data;
        setUser(userData);
      } catch {
        // token inválido → limpiar sesión
        setUser(null);
      }
    }

    bootstrap();
  }, [auth.token]);
}