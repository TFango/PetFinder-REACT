import React, { useEffect } from "react";

import { PetCard } from "../../components/petCard";

import { usePets } from "../../hooks/usePets";
import { useLocation } from "../../hooks/useLocation";

import { useState } from "react";

import { ReportPetModal } from "./reportPetModal";

import styles from "./PetsNearby.module.css";

type SelectedPet = {
  id: string;
  name: string;
} | null;

export function PetsNearby() {
  const { nearbyPets, getNearbyPets, loading, error } = usePets();
  const { location } = useLocation();

  const [selectedPet, setSelectedPet] = useState<SelectedPet>(null);

  useEffect(() => {
    if (location.lat && location.lng) {
      getNearbyPets(location.lat, location.lng);
    }
  }, [location.lat, location.lng]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (nearbyPets.length === 0) {
    return <p>No hay mascotas reportadas cerca</p>;
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Mascotas perdidas cerca</h1>

        {nearbyPets.map((pet) => (
          <PetCard
            key={pet.objectID}
            id={pet.objectID}
            name={pet.name}
            imageUrl={pet.imageUrl}
            location={pet.location!}
            mode="petsNearby"
            onReport={() =>
              setSelectedPet({ id: pet.objectID, name: pet.name })
            }
          />
        ))}
      </div>
      {selectedPet && (
        <ReportPetModal
          petId={selectedPet.id}
          name={selectedPet.name}
          onClose={() => setSelectedPet(null)}
        />
      )}
    </main>
  );
}
