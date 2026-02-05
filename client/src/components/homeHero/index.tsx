import React from "react";

import { Button } from "../../ui/button";

import styles from "./HomerHero.module.css";

export function HomeHero() {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <img src="/images/home.png" alt="" className={styles.img} />

        <section className={styles.info}>
          <h1 className={styles.title}>Pet Finder App</h1>
          <p className={styles.description}>
            Encontrá y reportá mascotas perdidas cerca de tu ubicación
          </p>
        </section>

        <section className={styles.buttons}>
          <Button variant="blue">Dar mi ubicación actual</Button>
          <Button variant="green">¿Cómo funciona Pet Finder?</Button>
        </section>
      </div>
    </main>
  );
}
