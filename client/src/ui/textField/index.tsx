import React from "react";
import styles from "./TextField.module.css";

type InputType = "text" | "email" | "password" | "number";

type Props = {
  id: string;
  name: string;
  type: InputType;
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
};

export function TextField({
  id,
  name,
  type,
  label,
  value,
  defaultValue,
  onChange,
  readOnly,
}: Props) {
  return (
    <div className={styles.root}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={styles.input}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}
