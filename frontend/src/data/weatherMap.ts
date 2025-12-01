// src/data/weatherMap.ts

// Fondos
import soleado from "../assets/weather/soleado.png";
import nublado from "../assets/weather/nublado.png";
import lluvioso from "../assets/weather/lluvioso.png";
import parcial from "../assets/weather/parcial.png";

// Michis
import michiSol from "../assets/michis/michi-sol.png";
import michiParcial from "../assets/michis/michi-parcial.png";
import michiLluvia from "../assets/michis/michi-lluvia.png";
import michiNublado from "../assets/michis/michi-nublado.png";

// ------------------------------
// CLIMAS POSSIBLES DE LA API
// ------------------------------
// Clear → soleado
// Clouds → nublado / parcial
// Rain → lluvia
// Drizzle → llovizna
// Thunderstorm → tormenta
// Snow → nieve
// Mist / Fog / Haze → neblina

export function mapWeatherToAssets(apiWeather: string) {
  const w = apiWeather.toLowerCase();

  if (w.includes("clear"))
    return { fondo: soleado, michi: michiSol };

  if (w.includes("cloud"))
    return { fondo: parcial, michi: michiParcial };

  if (w.includes("rain"))
    return { fondo: lluvioso, michi: michiLluvia };

  if (w.includes("drizzle"))
    return { fondo: lluvioso, michi: michiLluvia };

  if (w.includes("thunder"))
    return { fondo: lluvioso, michi: michiLluvia };

  if (w.includes("mist") || w.includes("fog") || w.includes("haze"))
    return { fondo: nublado, michi: michiNublado };

  return { fondo: parcial, michi: michiParcial };
}
