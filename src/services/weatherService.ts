export async function getWeather(city: string) {
  const apiKey = "TU_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error obteniendo clima");

  return response.json();
}
