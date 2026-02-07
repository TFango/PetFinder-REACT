import React from "react";

import { Button } from "../../../ui/button/";

import styles from "./UserActions.module.css";
import { useNavigate } from "react-router-dom";

export function UserActions() {
  const navigate = useNavigate();

  return (
    <section className={styles.root}>
      <Button
        onClick={() => {
          navigate("/user/MyData");
        }}
        variant="blue"
      >
        Modificar datos personales
      </Button>
      <Button
        onClick={() => {
          navigate("/user/changePassword");
        }}
        variant="blue"
      >
        Modificar contraseña
      </Button>
    </section>
  );
}
