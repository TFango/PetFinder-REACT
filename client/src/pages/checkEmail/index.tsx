import React from "react";

import { AuthForm } from "../../components/authForm";

import styles from "./AuthEmail.module.css";

export function CheckEmail() {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <img src="/images/auth.png" alt="" className={styles.img} />

        <section className={styles.info}>
          <h1 className={styles.title}>Ingresar</h1>
          <p className={styles.description}>Ingresá tu email para continuar.</p>
        </section>

        <AuthForm mode="email" />
      </div>
    </main>
  );
}
