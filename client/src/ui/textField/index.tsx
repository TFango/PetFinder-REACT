import React from "react";

type InputType = "text" | "email" | "password" | "number";

import styles from "./TextField.module.css";

type Props = {
  id: string;
  name: string;
  type: InputType;
  label: string;
  defaultValue?: string;
};

export function TextField({ id, name, type, label, defaultValue }: Props) {
  return (
    <div className={styles.root}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} type={type} name={name} className={styles.input} defaultValue={defaultValue}/>
    </div>
  );
}
