import React from "react";

import { UserActions } from "./userActions/UserActions";
import { UserInfo } from "./userInfo/UserInfo";

import styles from "./UserMenu.module.css"

export function UserMenu() {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Mis datos</h1>
        <UserActions />
        <UserInfo />
      </div>
    </main>
  );
}
