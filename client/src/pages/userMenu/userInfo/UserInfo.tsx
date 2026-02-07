import React from "react";

import { useAtomValue } from "jotai";
import { authAtom } from "../../../atoms/auth";

import styles from "./UserInfo.module.css";

export function UserInfo() {
  const auth = useAtomValue(authAtom);

  return (
    <section className={styles.root}>
      <p className={styles.email}>{auth.email}</p>
      <button className={styles.btn}>CERRAR SESÍON</button>
    </section>
  );
}
