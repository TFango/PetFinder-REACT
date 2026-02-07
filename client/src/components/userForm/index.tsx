import React from "react";
import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";

import styles from "./UserForm.module.css";

import { useAtomValue } from "jotai";
import { userAtom } from "../../atoms/user";

type Props = {
  mode: "data" | "password";
};

export function UserForm({ mode }: Props) {
  const user = useAtomValue(userAtom);

  return (
    <form action="" className={styles.root}>
      <div className={styles.container}>
        {mode === "data" && (
          <>
            <TextField
              id="nombre"
              name="nombre"
              type="text"
              label="NOMBRE"
              defaultValue={user.name}
            />
            <TextField
              id="localidad"
              name="localidad"
              type="text"
              label="LOCALIDAD"
              defaultValue={user.location}
            />
          </>
        )}

        {mode === "password" && (
          <>
            <TextField
              id="password"
              name="password"
              type="password"
              label="CONTRASEÑA"
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="CONFIRMAR CONTRASEÑA"
            />
          </>
        )}
      </div>

      <Button variant="blue">Guardar</Button>
    </form>
  );
}
