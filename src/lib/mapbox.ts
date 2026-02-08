export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<string> {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&language=es`,
  );

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("No se pudo obtener la ubicación");
  }

  const fullPlaceName: string = data.features[0].place_name;

  const shortPlaceName = fullPlaceName
    .split(",")
    .slice(0, 2)
    .join(",")
    .toLowerCase();

  return shortPlaceName;
}
