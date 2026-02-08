import React from "react";

import { Button } from "../../../ui/button";

import { useReport } from "../../../hooks/useReport";

import styles from "./ReportPetModal.module.css";

type Props = {
  petId: string;
  name: string;
  onClose: () => void;
};

export function ReportPetModal({ petId, name, onClose }: Props) {
  const { createReport, loading, error } = useReport();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const reporterName = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();

    const reporterPhone = (
      form.elements.namedItem("phone") as HTMLInputElement
    ).value.trim();

    const info = (
      form.elements.namedItem("info") as HTMLTextAreaElement
    ).value.trim();

    await createReport(petId, reporterName, Number(reporterPhone), info);
    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.btn}>
          ✕
        </button>

        <h2 className={styles.title}>Reportar información de {name}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="name" className={styles.labal}>
              NOMBRE
            </label>
            <input type="text" name="name" id="name" className={styles.input} />
          </div>

          <div>
            <label htmlFor="phone" className={styles.labal}>
              TELEFONO
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              className={styles.input}
            />
          </div>

          <label htmlFor="info" className={styles.labal}>
            ¿DÓNDE LO VISTE?
          </label>
          <textarea id="info" name="info" className={styles.input} />

          <Button type="submit" variant="green" disabled={loading}>
            {loading ? "Enviando..." : "Enviar información"}
          </Button>

          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
