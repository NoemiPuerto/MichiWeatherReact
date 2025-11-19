// src/types/weather.ts

// --- TIPOS DE TU APLICACIÓN (CurrentCityData, etc.) ---

export interface StatsData {
  probLluvia: number; // Porcentaje (0-100)
  humedad: number; // Porcentaje (0-100)
  viento: number; // Velocidad en km/h
}

export interface HourlyForecast {
  label: string;
  iconKey: string;
  temp: number;
}

export interface WeeklyForecastDay {
  day: string;
  iconKey: string;
  max: number;
  min: number;
}

// Estructura final de datos que usa tu componente WeatherPage
export interface CurrentCityData {
  id: string;
  location: string;
  condition: string;
  temp: number;
  max: number;
  min: number;
  stats: StatsData;
  hourly: HourlyForecast[];
  weekly: WeeklyForecastDay[];
  conditionIconKey: string;
}

// --- TIPOS DE OPENWEATHERMAP (One Call API) ---

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CurrentWeather {
  dt: number; // Time
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
}

interface HourlyItem extends CurrentWeather {
  pop: number; // Probability of precipitation
}

interface DailyItem {
  dt: number; // Time
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  pop: number; // Probability of precipitation
  rain?: number; // Volume, if present
  uvi: number;
}

// Respuesta completa de OpenWeatherMap One Call
export interface OpenWeatherMapResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyItem[]; // 48 horas
  daily: DailyItem[]; // 8 días
}