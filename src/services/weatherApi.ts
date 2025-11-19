// src/services/weatherApi.ts
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string || "441745e11d605543eceacd39828b099d";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const ONECALL_URL = "https://api.openweathermap.org/data/3.0/onecall";

// caches simples
const geoCache = new Map<string, any>();
const oneCallCache = new Map<string, any>();

export async function searchCities(query: string, limit = 5) {
  if (!query || query.trim().length === 0) return [];
  const key = `${query.toLowerCase()}_${limit}`;
  if (geoCache.has(key)) return geoCache.get(key);
  const url = `${GEO_URL}?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const mapped = data.map((d: any) => ({
    name: d.name,
    display: `${d.name}${d.state ? ", " + d.state : ""}${d.country ? ", " + d.country : ""}`,
    lat: d.lat,
    lon: d.lon,
    country: d.country,
    state: d.state,
  }));
  geoCache.set(key, mapped);
  return mapped;
}

export async function getCityCoordinates(cityName: string) {
  const key = `coords_${cityName.toLowerCase()}`;
  if (geoCache.has(key)) return geoCache.get(key);
  const url = `${GEO_URL}?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data || data.length === 0) return null;
  geoCache.set(key, data[0]);
  return data[0];
}

export async function getWeatherByCoords(lat: number, lon: number) {
  const key = `${lat.toFixed(3)}_${lon.toFixed(3)}`;
  if (oneCallCache.has(key)) return oneCallCache.get(key);
  const url = `${ONECALL_URL}?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenWeather error ${res.status}: ${t}`);
  }
  const data = await res.json();
  oneCallCache.set(key, data);
  return data;
}

/**
 * Convenience: get weather by city name (geocode -> onecall)
 */
export async function getWeatherByCityName(cityName: string) {
  const coords = await getCityCoordinates(cityName);
  if (!coords) throw new Error("Ciudad no encontrada");
  const raw = await getWeatherByCoords(coords.lat, coords.lon);
  return { raw, cityName: coords.name, lat: coords.lat, lon: coords.lon };
}
