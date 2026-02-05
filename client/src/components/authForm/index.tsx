import React from "react";

import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

import styles from "./AuthForm.module.css";

type Props = {
  mode: "email" | "login" | "register";
};

export function AuthForm({ mode }: Props) {
  const navigate = useNavigate();

  return (
    <form action="" className={styles.root}>
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

      <Button variant="blue">
        {mode === "email" && "Continuar"}
        {mode === "login" && "Acceder"}
        {mode === "register" && "Siguiente"}
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
