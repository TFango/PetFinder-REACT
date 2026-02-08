import React from "react";

import { AuthForm } from "../../components/authForm";

import styles from "./Register.module.css";

export function Register() {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.info}>
          <h1 className={styles.title}>Registrarse</h1>
          <p className={styles.description}>
            Ingresá los siguientes datos para realizar el registro
          </p>
        </section>

        <AuthForm mode="register" />
      </div>
    </main>
  );
}
