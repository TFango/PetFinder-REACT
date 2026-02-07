import React from "react";

import { UserForm } from "../../components/userForm";

import styles from "./ChangePassword.module.css"

export function ChangePassword() {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contraseña</h1>

        <UserForm mode="password" />
      </div>
    </main>
  );
}
