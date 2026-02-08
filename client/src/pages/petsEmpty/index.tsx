import React from "react";
import { Button } from "../../ui/button";

import style from "./PetsEmpty.module.css";
import { useNavigate } from "react-router-dom";

export function PetsEmpty() {
  const navigate = useNavigate();

  return (
    <main className={style.root}>
      <div className={style.container}>
        <section className={style.info}>
          <h1 className={style.title}>Mascotas reportadas</h1>
          <p className={style.description}>
            Aún no reportaste mascotas perdidas
          </p>
        </section>

        <img src="/images/petsEmpty.png" alt="" className={style.img} />

        <Button variant="blue" onClick={() => navigate("/pets/report")}>Publicar reporte</Button>
      </div>
    </main>
  );
}
