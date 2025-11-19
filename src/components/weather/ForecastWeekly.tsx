import type { IconType } from "react-icons"
import { WiDaySunny, WiCloud, WiRain, WiNightClear } from "react-icons/wi"
// Importamos el tipo desde el nuevo archivo de tipos
import type { WeeklyForecastDay } from "../types/weather" 

// Props
interface ForecastWeeklyProps {
  data?: WeeklyForecastDay[]
}

// Mapeo de nombres a React Icons
const iconMap: Record<string, IconType> = {
  sol: WiDaySunny,
  nublado: WiCloud,
  lluvia: WiRain,
  noche: WiNightClear,
  parcial: WiCloud, // Clave añadida para la condición 'parcialmente nublado'
}

export default function ForecastWeekly({ data = [] }: ForecastWeeklyProps) {
  if (!Array.isArray(data) || data.length === 0) return null

  return (
    <section aria-label="Pronóstico semanal" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((d, i) => {
          if(i % 8 !== 0) return null; // Mostrar solo un día cada 8 slots (24 horas)
          // Usamos d.iconKey, que es la clave que generamos en WeatherPage
          const IconComponent = d.iconKey ? iconMap[d.iconKey] : null
          
          // Agregamos una clase especial al slot "Hoy" (el primer elemento)
          const isToday = d.day === "Hoy";

          return (
            <div
              key={i}
              className={`min-w-[120px] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center transition ${
                isToday
                  ? "bg-[var(--accent)]/90 text-white" // Estilo para 'Hoy'
                  : "bg-[var(--panel)]/90 dark:bg-[var(--glass)] hover:scale-[1.03]" // Estilo para el resto
              }`}
            >
              <p 
                className={`text-sm font-semibold ${
                  isToday ? "text-white" : "text-[var(--muted)]" // Texto blanco para 'Hoy'
                }`}
              >
                {d.day}
              </p>

              {IconComponent ? (
                <IconComponent
                  className="w-8 h-8 my-2"
                  style={{ color: isToday ? "white" : "var(--accent)" }}
                />
              ) : (
                <div className="w-8 h-8 my-2" />
              )}

              <div className="flex flex-col items-center">
                <span 
                  className={`text-lg font-bold ${
                    isToday ? "text-white" : "text-[var(--accent)]"
                  }`}
                >
                  {d.max}°
                </span>
                <span className="text-sm text-[var(--muted)]">{d.min}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}