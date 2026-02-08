import { apiFetch } from "../lib/api";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

type Props = {
  name: string;
  reporterPhone: number;
  location: string;
};

export function useReport() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createReport(
    petId: string,
    name: string,
    reporterPhone: number,
    location: string,
  ) {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch(`/pets/${petId}/report`, {
        method: "POST",
        body: { name, reporterPhone, location },
      });

      navigate("/");
      return res;
    } catch (err: any) {
      setError("Error al crear el report de la mascota");
    } finally {
      setLoading(false);
    }
  }

  return { createReport, loading, error };
}
