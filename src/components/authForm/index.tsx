import React, { useState } from "react";
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
  const { checkEmail, register, login, loading } = useAuth();
  const { getMe } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) return;

    if (mode === "email") {
      await checkEmail(email);
      return;
    }

    if (mode === "login") {
      await login(email, password);
      await getMe();
      return;
    }

    if (mode === "register") {
      await register(email, password, confirmPassword, name);
      await getMe();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <TextField
        id="email"
        name="email"
        type="email"
        label="EMAIL"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {mode === "login" && (
        <TextField
          id="password"
          name="password"
          type="password"
          label="CONTRASEÑA"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      {mode === "register" && (
        <>
          <TextField
            id="name"
            name="name"
            type="text"
            label="NOMBRE"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="password"
            name="password"
            type="password"
            label="CONTRASEÑA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="CONFIRMAR CONTRASEÑA"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </>
      )}

      <Button variant="blue" type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Continuar"}
      </Button>

      <section className={styles.info}>
        {mode === "email" && (
          <>
            <p className={styles.description}>Aún no tenes cuenta?</p>
            <button
              type="button"
              className={styles.btn}
              onClick={() => navigate("/auth/register")}
            >
              Registrate
            </button>
          </>
        )}
      </section>
    </form>
  );
}
