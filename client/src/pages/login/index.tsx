import React from "react";

import { AuthForm } from "../../components/authForm";

import styles from "./Login.module.css";

export function Login() {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.info}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.description}>
            Ingresá los siguientes datos para iniciar sesión
          </p>
        </section>

        <AuthForm mode="login" />
      </div>
    </main>
  );
}
