import React, { useState } from "react";

import { ImageDropzone } from "../../components/imageDropzone";
import { TextField } from "../../ui/textField";
import { PetMap } from "../../components/mapbox";
import { useLocation } from "../../hooks/useLocation";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

import { usePets } from "../../hooks/usePets";

import styles from "./ReportPet.module.css"

type Errors = {
  name?: string;
  image?: string;
  location?: string;
};

export function ReportPet() {
  const navigate = useNavigate();

  const { createPet, error, loading } = usePets();

  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const { lat, lng, locationText, setPosition } = useLocation(
    -38.0055,
    -57.5426,
  ); // Mar del Plata

  function validate(form: HTMLFormElement): Errors {
    const newErrors: Errors = {};

    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const name = nameInput.value.trim();

    if (!name) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!image) {
      newErrors.image = "La imagen es obligatoria";
    }

    if (!locationText) {
      newErrors.location = "La ubicación es obligatoria";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();

    const nameInput = form.elements.namedItem("name") as HTMLInputElement;

    formData.append("name", nameInput.value.trim());
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
    formData.append("locationText", locationText);
    formData.append("image", image!);

    await createPet(formData);
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.info}>
          <h1 className={styles.title}>Reportar Mascota</h1>
          <p className={styles.description}>
            Ingresá la siguiente información para realizar el reporte de la
            mascota
          </p>
        </section>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField id="name" name="name" type="text" label="NOMBRE" />

          <ImageDropzone file={image} onSelect={setImage} />

          <PetMap lat={lat} lng={lng} onChange={setPosition} />
          <TextField
            id="location"
            name="location"
            type="text"
            label="UBICACION"
            defaultValue={locationText}
          />

          <section className={styles.buttons}>
            <Button variant="green" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Reportar Mascota"}
            </Button>
            <Button variant="gray" onClick={() => navigate("/")}>
              Cancelar
            </Button>
          </section>
        </form>
      </div>
    </main>
  );
}
