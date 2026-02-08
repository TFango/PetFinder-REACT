import { getDefaultStore, useAtom } from "jotai";
import { apiFetch } from "../lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAtom } from "../atoms/auth";

import { myPetsAtom, nearbyPetsAtom, type NearbyPet } from "../atoms/pets";
import { PetsNearby } from "../pages/petsNearby";

export type Pet = {
  id: string;
  name: string;
  imageUrl: string;
  location: string | null;
  lat: number;
  lng: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const store = getDefaultStore();

export function usePets() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [myPets, setMyPets] = useAtom(myPetsAtom);
  const [nearbyPets, setNearbyPets] = useAtom(nearbyPetsAtom);

  async function createPet(formData: any) {
    try {
      setLoading(true);
      setError(null);

      const auth = store.get(authAtom);

      const response = await fetch(`${API_BASE_URL}/pets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la mascota");
      }

      navigate("/");
      return data;
    } catch (err: any) {
      setError("Error al create el pet");
    } finally {
      setLoading(false);
    }
  }

  async function getMyPets() {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch("/pets/me");
      setMyPets(data.pets);
    } catch (err: any) {
      setError("Error al obtener todas las mascotas reportadas");
    } finally {
      setLoading(false);
    }
  }

  async function getPetById(petId: string) {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch(`/pets/${petId}`);

      return data.pet;
    } catch (err: any) {
      setError("Error al buscar la mascota perdida");
    } finally {
      setLoading(false);
    }
  }

  async function editPet(formData: FormData, petId: string) {
    try {
      setLoading(true);
      setError(null);

      const auth = store.get(authAtom);

      const response = await fetch(`${API_BASE_URL}/pets/${petId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la mascota");
      }

      navigate("/pets/myPetsReport");
    } catch (err: any) {
      setError("Error al editar la mascota");
    } finally {
      setLoading(false);
    }
  }

  async function getNearbyPets(lat: number, lng: number) {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch(`/pets/nearby?lat=${lat}&lng=${lng}`);

      setNearbyPets(data.results as NearbyPet[]);
    } catch (err: any) {
      setError("Error al buscar mascotas perdidas cercanas");
    } finally {
      setLoading(false);
    }
  }

  async function markAsFound(petId: string) {
    try {
      setLoading(true);
      setError(null);
      console.log("markasfound");

      const res = await apiFetch(`/pets/${petId}/found`, {
        method: "PATCH",
      });

      return res;
    } catch (err: any) {
      setError("Error al marcar mascota como encontrada");
    } finally {
      setLoading(false);
    }
  }

  return {
    myPets,
    markAsFound,
    nearbyPets,
    getNearbyPets,
    createPet,
    getMyPets,
    editPet,
    getPetById,
    error,
    loading,
  };
}
