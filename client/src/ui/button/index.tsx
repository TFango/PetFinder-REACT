import React, { type ReactNode } from "react";

import styles from "./Button.module.css";

type ButtonVariant = "blue" | "green" | "red" | "gray";

type Props = {
  variant?: ButtonVariant;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
};

export function Button({
  variant = "blue",
  onClick,
  children,
  disabled = false,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.root} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
