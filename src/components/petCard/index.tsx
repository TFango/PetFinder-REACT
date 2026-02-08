import React from "react";

import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

import styles from "./PetCard.module.css";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  mode: "myPets" | "petsNearby";
  onReport?: () => void;
};

export function PetCard({
  id,
  name,
  imageUrl,
  location,
  mode,
  onReport,
}: Props) {
  const navigate = useNavigate();

  return (
    <article data-pet-id={id} className={styles.root}>
      <img src={imageUrl} alt="" className={styles.img} />

      <div className={styles.footer}>
        <section className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.location}>{location}</p>
        </section>

        {mode === "myPets" && (
          <Button
            onClick={() => navigate(`/pets/${id}`)}
            type="submit"
            variant="editPet"
          >
            Editar
          </Button>
        )}

        {mode === "petsNearby" && (
          <Button variant="red" onClick={onReport}>
            Reportar
          </Button>
        )}
      </div>
    </article>
  );
}
