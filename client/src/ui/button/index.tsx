import React, { type ReactNode } from "react";

import styles from "./Button.module.css";

type ButtonVariant = "blue" | "green" | "red" | "gray";

type Props = {
  variant?: ButtonVariant;
  onClick?: () => void;
  children: ReactNode;
};

export function Button({ variant = "blue", onClick, children }: Props) {
  return (
    <button onClick={onClick} className={`${styles.root} ${styles[variant]}`}>
      {children}
    </button>
  );
}
