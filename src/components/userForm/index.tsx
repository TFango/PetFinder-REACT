import React from "react";
import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";

import styles from "./UserForm.module.css";

import { useAtomValue } from "jotai";
import { userAtom } from "../../atoms/user";

import { useUser } from "../../hooks/useUser";

type Props = {
  mode: "data" | "password";
};

export function UserForm({ mode }: Props) {

  const user = useAtomValue(userAtom);
  const { updateMe, changePassword, loading, error } = useUser();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    if (mode === "data") {
      const newName = (
        form.elements.namedItem("nombre") as HTMLInputElement
      ).value.trim();

      const newLocation = (
        form.elements.namedItem("localidad") as HTMLInputElement
      ).value.trim();

      await updateMe(newName, newLocation);
    }

    if (mode === "password") {
      const newPassword = (
        form.elements.namedItem("password") as HTMLInputElement
      ).value;

      await changePassword(newPassword);
    }
  }

  return (
    <form onSubmit={handleSubmit} action="" className={styles.root}>
      <div className={styles.container}>
        {mode === "data" && (
          <>
            <TextField
              id="nombre"
              name="nombre"
              type="text"
              label="NOMBRE"
              defaultValue={user?.name}
            />
            <TextField
              id="localidad"
              name="localidad"
              type="text"
              label="LOCALIDAD"
              defaultValue={user?.location}
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

      <Button type="submit" variant="blue" disabled={loading}>
        {loading ? "Cargando..." : "Guardar"}
      </Button>
    </form>
  );
}
