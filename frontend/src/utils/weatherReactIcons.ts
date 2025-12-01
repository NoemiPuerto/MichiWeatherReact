import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiFog,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiDayCloudy,
} from "react-icons/wi";
import type { IconType } from "react-icons";

// Mapa completo de íconos por weatherCode
export const weatherReactIcons: Record<number, IconType> = {
  // Clear
  0: WiDaySunny,

  // Partly cloudy
  1: WiDayCloudy,
  2: WiCloud,

  // Overcast
  3: WiCloudy,

  // Fog
  45: WiFog,
  48: WiFog,

  // Drizzle
  51: WiShowers,
  53: WiShowers,
  55: WiShowers,
  56: WiShowers,
  57: WiShowers,

  // Rain
  61: WiRain,
  63: WiRain,
  65: WiRain,
  66: WiRain,
  67: WiRain,

  // Snow
  71: WiSnow,
  73: WiSnow,
  75: WiSnow,
  77: WiSnow,

  // Mixed rain/snow
  80: WiShowers,
  81: WiShowers,
  82: WiShowers,
  85: WiSnow,
  86: WiSnow,

  // Thunderstorms
  95: WiThunderstorm,
  96: WiThunderstorm,
  99: WiThunderstorm,
};

// Default icon (cuando haya código raro)
export const getWeatherIcon = (code: number): IconType => {
  return weatherReactIcons[code] || WiCloud;
};
