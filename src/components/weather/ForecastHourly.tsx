import type { IconType } from "react-icons"
import { WiDaySunny, WiCloud, WiRain, WiNightClear } from "react-icons/wi"
// Importamos el tipo desde el nuevo archivo de tipos
import type { HourlyForecast } from "../../types/weather"

// Props
interface ForecastHourlyProps {
  data?: HourlyForecast[]
}

// Mapeo de claves (que vienen del getWeatherIconKey) a React Icons
const iconMap: Record<string, IconType> = {
  sol: WiDaySunny,
  nublado: WiCloud,
  lluvia: WiRain,
  noche: WiNightClear,
  llovizna: WiRain,
  granizo: WiRain,
}

export default function ForecastHourly({ data = [] }: ForecastHourlyProps) {
  if (!Array.isArray(data) || data.length === 0) return null

  return (
    <section aria-label="Pronóstico por horas" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((hour, i) => {
          // Usamos hour.iconKey, que es la clave que generamos en WeatherPage
          const IconComponent = hour.iconKey ? iconMap[hour.iconKey] : null
          
          // Agregamos una clase especial al slot "Ahora" (el primer elemento)
          const isNow = hour.label === "Ahora";
          
          return (
            <div
              key={i}
              className={`min-w-[120px] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center transition ${
                isNow
                  ? "bg-[var(--accent)]/90 text-white" // Estilo para 'Ahora'
                  : "bg-[var(--panel)]/90 dark:bg-[var(--glass)] hover:scale-[1.03]" // Estilo para el resto
              }`}
            >
              <p 
                className={`text-sm font-semibold ${
                  isNow ? "text-white" : "text-[var(--muted)]" // Texto blanco para 'Ahora'
                }`}
              >
                {hour.label}
              </p>

              {IconComponent ? (
                <IconComponent
                  className="w-8 h-8 my-2"
                  style={{ color: isNow ? "white" : "var(--accent)" }} // Icono blanco para 'Ahora'
                />
              ) : (
                <div className="w-8 h-8 my-2" />
              )}

              <p 
                className={`text-lg font-bold ${
                  isNow ? "text-white" : "text-[var(--accent)]" // Temperatura blanca para 'Ahora'
                }`}
              >
                {hour.temp}°
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}