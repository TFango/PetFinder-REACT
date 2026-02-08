import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePets, type Pet } from "../../hooks/usePets";

import { useLocation } from "../../hooks/useLocation";

import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";
import { ImageDropzone } from "../../components/imageDropzone";
import { PetMap } from "../../components/mapbox";

import styles from "./EditPet.module.css";

export function EditPet() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();

  const { getPetById, markAsFound, editPet, loading } = usePets();

  const [pet, setPet] = useState<Pet | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { lat, lng, locationText, setPosition, setLocationText } = useLocation(
    -38.0055,
    -57.5426,
  );

  useEffect(() => {
    if (!petId) return;

    async function loadPet() {
      const data = await getPetById(petId!);
      setPet(data);

      setPosition(data.lat, data.lng);
      setLocationText(data.location);
    }

    loadPet();
  }, [petId]);

  if (!pet) return <p>Cargando mascota...</p>;

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;

    const formData = new FormData();
    formData.append("name", nameInput.value.trim());
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
    formData.append("location", locationText);

    if (image) {
      formData.append("image", image);
    }

    await editPet(formData, petId!);
  }

  async function handleMarkFound() {
    await markAsFound(petId!);
    navigate("/");
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Editar report de mascota</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            id="name"
            name="name"
            type="text"
            label="NOMBRE"
            defaultValue={pet.name}
          />

          <ImageDropzone
            file={image}
            imageUrl={pet.imageUrl}
            onSelect={setImage}
          />

          <PetMap
            lat={lat as number}
            lng={lng as number}
            onChange={setPosition}
          />

          <TextField
            id="location"
            name="location"
            type="text"
            label="UBICACIÓN"
            value={locationText}
            readOnly
          />

          <section className={styles.buttons}>
            <Button variant="green" type="submit" disabled={loading}>
              Guardar cambios
            </Button>

            <Button variant="gray" type="button" onClick={handleMarkFound}>
              Reportar como encontrada
            </Button>

            <Button variant="red">Eliminar reporte</Button>
          </section>
        </form>
      </div>
    </main>
  );
}
