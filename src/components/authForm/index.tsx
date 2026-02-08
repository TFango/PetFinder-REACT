import React from "react";

import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

import styles from "./AuthForm.module.css";

import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

type Props = {
  mode: "email" | "login" | "register";
};

export function AuthForm({ mode }: Props) {
  const navigate = useNavigate();

  const buttonText = {
    email: "Continuar",
    login: "Acceder",
    register: "Siguiente",
  }[mode];
  const { checkEmail, register, login, loading, error } = useAuth();
  const { getMe } = useUser();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();

    if (mode === "email") {
      await checkEmail(email);
      return;
    }

    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value.trim();

    if (mode === "login") {
      await login(email, password);
      await getMe();
      return;
    }

    if (mode === "register") {
      const name = (
        form.elements.namedItem("name") as HTMLInputElement
      ).value.trim();

      const passConfirm = (
        form.elements.namedItem("confirmPassword") as HTMLInputElement
      ).value.trim();

      await register(email, password, passConfirm, name);
      await getMe();
    }
  }

  return (
    <form onSubmit={handleSubmit} action="" className={styles.root}>
      <TextField id="email" name="email" type="email" label="EMAIL" />

      {mode === "login" && (
        <TextField
          id="password"
          name="password"
          type="password"
          label="CONTRASEÑA"
        />
      )}

      {mode === "register" && (
        <>
          <TextField id="name" name="name" type="text" label="NOMBRE" />
          <TextField
            id="password"
            name="password"
            type="password"
            label="CONTRASEÑA"
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="CONFIRMAR CONTRASEÑA"
          />
        </>
      )}

      <Button variant="blue" type="submit" disabled={loading}>
        {loading ? "Cargando..." : buttonText}
      </Button>

      <section className={styles.info}>
        {mode === "email" && (
          <>
            <p className={styles.description}>Aún no tenes cuenta?</p>
            <button
              className={styles.btn}
              type="button"
              onClick={() => navigate("/auth/register")}
            >
              Registrate.
            </button>
          </>
        )}
        {mode === "login" && (
          <>
            <button
              className={styles.btn}
              type="button"
              onClick={() => navigate("/auth")}
            >
              Olvide mi contraseña
            </button>
          </>
        )}
        {mode === "register" && (
          <>
            <p className={styles.description}>Ya tenes una cuenta?</p>
            <button
              className={styles.btn}
              type="button"
              onClick={() => navigate("/auth/login")}
            >
              Iniciar sesión.
            </button>
          </>
        )}
      </section>
    </form>
  );
}
