// src/pages/WeatherPage.tsx

import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios"; 
import WeatherCard from "../components/weather/WeatherCard";
import ForecastHourly from "../components/weather/ForecastHourly";
import ForecastWeekly from "../components/weather/ForecastWeekly";
import Stats from "../components/weather/Stats";

// Importar los tipos necesarios, ahora adaptados a OpenWeatherMap
import type { 
  CurrentCityData, 
  HourlyForecast,
  WeeklyForecastDay,
  OpenWeatherMapResponse // Nuevo tipo de respuesta de la API
} from "../types/weather";

// Clave de la API (OpenWeatherMap)
// const API_KEY = "61ad022b0c774c3dca99f909d5813fae"; 

const API_KEY = "8fcc7028afa5bdbce73ce449d2217f56"; // Clave de API de OpenWeatherMap

// URL base de la API One Call de OpenWeatherMap
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Lista de ciudades disponibles (usando coordenadas geográficas requeridas por OWM)
const availableCities = [
  // lat, lon, nombre a mostrar
  { id: "cancun", name: "Cancún", lat: 21.1619, lon: -86.8515 },
  { id: "bogota", name: "Bogotá", lat: 4.711, lon: -74.0721 },
  { id: "madrid", name: "Madrid", lat: 40.4168, lon: -3.7038 },
  { id: "santiago", name: "Santiago", lat: -33.4489, lon: -70.6693 },
];

/**
 * Función que mapea la condición de OpenWeatherMap (OWM) a la clave de icono
 */
const getWeatherIconKey = (iconCode: string): string => {
  // Los códigos de icono de OWM son: 01d, 01n, 02d, 02n, etc.
  
  // Condición de lluvia/tormenta
  if (iconCode.includes("09") || iconCode.includes("10") || iconCode.includes("11")) return "lluvia";
  // Nubes dispersas (parcialmente nublado)
  if (iconCode.includes("02") || iconCode.includes("03")) return "parcial"; 
  // Nubes completas (nublado)
  if (iconCode.includes("04")) return "nublado"; 
  // Nieve/Niebla
  if (iconCode.includes("13") || iconCode.includes("50")) return "nieve";
  
  // Cielo despejado (día/noche)
  if (iconCode.includes("01d")) return "sol";
  if (iconCode.includes("01n")) return "noche";
  
  return "sol"; // Default
};


/**
 * Transforma la respuesta de OpenWeatherMap a la estructura de datos de tu app.
 */
const mapApiResponseToCity = (data: OpenWeatherMapResponse, cityId: string, cityName: string): CurrentCityData => {
  
  // Usamos un objeto para obtener la hora actual de manera segura con el timezone
  const cityTimezone = data.timezone;

  // 1. Mapeo de Pronóstico por Horas (8 slots)
  console.log("Datos recibidos de OWM para mapeo:", data);
  const hourlyForecast: HourlyForecast[] = data.list.slice(0, 8).map((hourData, index) => {
    console.log("Procesando hora:", hourData);
    const time = new Date(hourData.dt * 1000);
    const label = index === 0 ? "Ahora" : new Date(hourData.dt_txt).getHours() + ":00" //time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '00', timeZone: cityTimezone });
    
    // Obtenemos la descripción y el código de icono de OWM
    const iconCode = hourData.weather[0]?.icon || '01d';
    const iconKey = getWeatherIconKey(iconCode);
    
    return {
      label: label,
      iconKey: iconKey, 
      temp: Math.round(hourData.main.temp - 273.15),
    };
  });
  
  // 2. Mapeo de Pronóstico Semanal (7 días, excluyendo el día actual)
  const weeklyForecast: WeeklyForecastDay[] = data.list.slice(0, 7).map((dayData, index) => {
    const date = new Date(dayData.dt * 1000);
    
    // Formato 'Hoy', 'Lun', 'Mar', etc.
    const dayLabel = index === 0 
      ? "Hoy" 
      : date.toLocaleDateString('es-ES', { weekday: 'short' }).charAt(0).toUpperCase() + date.toLocaleDateString('es-ES', { weekday: 'short' }).slice(1);
    
    const iconCode = dayData.weather[0]?.icon || '01d';
    const conditionText = dayData.weather[0]?.description || 'Cielo despejado';
    const iconKey = getWeatherIconKey(iconCode);
    console.log(dayData)

    return {
      day: dayLabel.replace('.', ''), 
      iconKey: iconKey,
      max: Math.round(dayData.main.temp_max - 273.15),
      min: Math.round(dayData.main.temp_min - 273.15),
    };
  });
  
  // 3. Construcción de los datos principales (CurrentCityData)
  const currentConditionText = data.list[0].weather[0].main || "Información no disponible";
  const conditionKey = getWeatherIconKey(data.list[0].weather[0].icon || '01d');
  
  // Probabilidad de lluvia del día se toma del primer item del Daily (que es hoy)
  const probLluviaHoy = Math.round((data.list[0]?.pop || 0) * 100);

  return {
    id: cityId,
    location: cityName,
    condition: currentConditionText.charAt(0).toUpperCase() + currentConditionText.slice(1),
    temp: Math.round(data.list[0].main.temp - 273.15),
    max: Math.round(data.list[0]?.main.temp_max - 273.15 || 0),
    min: Math.round(data.list[0]?.main.temp_min || 0),
    
    // Stats del día actual
    stats: {
      probLluvia: probLluviaHoy,
      humedad: data.list[0].main.humidity,
      // OWM da la velocidad en m/s. Convertimos a km/h (m/s * 3.6) y redondeamos.
      viento: Math.round(data.list[0].wind.speed * 3.6), 
    },
    
    hourly: hourlyForecast,
    weekly: weeklyForecast, 
    conditionIconKey: conditionKey,
  };
};

export default function WeatherPage() {
  const [viewMode, setViewMode] = useState<"hoy" | "semana">("hoy");
  const [selectedCityId, setSelectedCityId] = useState<string>(availableCities[0]?.id ?? "cancun");
  const [cityData, setCityData] = useState<CurrentCityData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCity = useMemo(() => {
    return availableCities.find(c => c.id === selectedCityId) || availableCities[0];
  }, [selectedCityId]);

  const fetchWeather = useCallback(async (city: typeof availableCities[0]) => {
    if (!API_KEY) {
      setError("Error: Clave de API no configurada.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setCityData(null);

    // URL usando latitud, longitud, exclusiones y unidades métricas.
    const url = `${API_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`;
    
    try {
      const response = await axios.get<OpenWeatherMapResponse>(url);
      
      const mappedData = mapApiResponseToCity(response.data, city.id, city.name);
      setCityData(mappedData);
    } catch (err) {
      console.error("Error CRÍTICO al obtener datos del clima (OWM):", err);
      
      // Manejo de errores específicos de OWM (ej: clave inválida)
      const axiosError = axios.isAxiosError(err) ? err : null;
      let displayError = `Error de conexión de red para ${city.name}.`;

      if (axiosError && axiosError.response?.status === 401) {
          displayError = "Error 401: Clave de API inválida o inactiva. Verifica que tu clave OWM esté correcta y activada.";
      } else if (axiosError) {
          displayError = `Error ${axiosError.response?.status || 'desconocido'} al cargar el clima.`;
      }
          
      setError(displayError); 
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto que se dispara al cambiar la ciudad o al inicio
  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity, fetchWeather]);

  // Manejo de estados de carga y error
  if (loading) {
    return <main className="container-michi">Cargando datos del clima...</main>;
  }

  if (error) {
    return (
      <main className="container-michi p-8">
        <div className="text-red-600 p-6 rounded-xl bg-red-100 dark:bg-red-900/50 border border-red-400 max-w-lg mx-auto shadow-lg">
          <h3 className="font-bold mb-2 text-xl">¡Error de Conexión a OpenWeatherMap!</h3>
          <p className="text-sm">{error}</p>
          <p className="mt-4 text-xs text-red-700 dark:text-red-300">
            **Verifica que la clave esté correcta y activada. Puede tardar unas horas después del registro.**
          </p>
        </div>
      </main>
    );
  }

  if (!cityData) {
    return <main className="container-michi">Selecciona una ciudad para cargar el clima.</main>;
  }

  // Renderizado del contenido principal
  return (
    <main className="container-michi min-h-[calc(100vh-160px)] flex flex-col lg:flex-row items-center justify-center py-10 gap-12">
      {/* LADO IZQUIERDO: Selector ciudad + WeatherCard */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="w-full max-w-[520px] px-4 sm:px-0 mb-4 flex justify-end">
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="px-3 py-2 rounded-full bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)] outline-none"
            aria-label="Seleccionar ciudad"
          >
            {availableCities.map((c) => (
              <option
                key={c.id}
                value={c.id}
                className="bg-[var(--panel)] dark:bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)]"
              >
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center w-full">
          {/* WeatherCard ahora recibe la clave del icono para obtener michi/fondo */}
          <WeatherCard
            location={cityData.location}
            condition={cityData.condition}
            temp={cityData.temp}
            max={cityData.max}
            min={cityData.min}
            conditionIconKey={cityData.conditionIconKey} 
          />
        </div>
      </div>

      {/* LADO DERECHO: Forecast + Stats */}
      <aside className="flex flex-col items-center gap-8 w-full lg:w-1/2 max-w-[520px]">
        {/* Botones Hoy / Semana */}
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode("hoy")}
            className={`h-10 px-6 rounded-full font-semibold transition-all duration-300 ${
              viewMode === "hoy"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)] hover:bg-[var(--accent)]/20"
            }`}
          >
            Hoy
          </button>

          <button
            onClick={() => setViewMode("semana")}
            className={`h-10 px-6 rounded-full font-semibold transition-all duration-300 ${
              viewMode === "semana"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)] hover:bg-[var(--accent)]/20"
            }`}
          >
            Semana
          </button>
        </div>

        {/* Forecast Horario / Semanal */}
        <div className="w-full overflow-x-auto p-4 rounded-xl bg-[var(--panel)]/50 dark:bg-[var(--glass)] shadow-michi-1 scroll-hidden">
          {viewMode === "hoy" ? (
            <ForecastHourly data={cityData.hourly} />
          ) : (
            <ForecastWeekly data={cityData.weekly} /> 
          )}
        </div>

        {/* Stats */}
        <Stats
          propLLuvia={cityData.stats.probLluvia}
          propHumedad={cityData.stats.humedad}
          propViento={cityData.stats.viento}
        />
      </aside>
    </main>
  );
}