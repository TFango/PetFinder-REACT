import React, { useEffect } from "react";

import { usePets } from "../../hooks/usePets";
import { PetCard } from "../../components/petCard";

import styles from "./MyPetsReport.module.css";
import { useNavigate } from "react-router-dom";

export function MyPetsReport() {
  const { myPets, getMyPets, error, loading } = usePets();

  const navigate = useNavigate();

  useEffect(() => {
    getMyPets();
  }, []);

  useEffect(() => {
    if (!loading && myPets.length === 0) {
      navigate("/pets/empty");
    }
  }, [loading, myPets]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Mascotas Reportadas</h1>
        {myPets.map((pet) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            name={pet.name}
            imageUrl={pet.imageUrl}
            location={pet.location}
            mode="myPets"
          />
        ))}
      </div>
    </main>
  );
}
