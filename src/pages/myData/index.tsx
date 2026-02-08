import React from "react";

import { UserForm } from "../../components/userForm";

import styles from "./MyData.module.css";

export function MyData() {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Datos personales</h1>

        <UserForm mode="data" />
      </div>
    </main>
  );
}
