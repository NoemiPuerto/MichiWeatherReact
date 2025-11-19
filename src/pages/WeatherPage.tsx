import { useEffect, useState } from "react"
import WeatherCard from "../components/WeatherCard"
import ForecastHourly from "../components/ForecastHourly"
import type { HourlyForecast } from "../components/ForecastHourly"
import ForecastWeekly from "../components/ForecastWeekly"
import Stats from "../components/Stats"

// importa JSON
import weatherJson from "../data/weather.json"

type City = {
  id: string
  name: string
  location: string
  condition: string
  temp: number
  max: number
  min: number
  stats: { probLluvia: number; humedad: number; viento: number }
  hourly: HourlyForecast[]
  weekly: Array<{ day: string; icon?: string; max: number; min: number }>
}

const cities: City[] = (weatherJson as any).cities ?? []

export default function WeatherPage() {
  const [viewMode, setViewMode] = useState<"hoy" | "semana">("hoy")
  const [selectedCityId, setSelectedCityId] = useState<string>(
    () => cities[0]?.id ?? "cancun"
  )
  const [city, setCity] = useState<City | null>(
    () => cities.find((c) => c.id === selectedCityId) ?? null
  )

  useEffect(() => {
    const found = cities.find((c) => c.id === selectedCityId) ?? cities[0] ?? null
    setCity(found)
  }, [selectedCityId])

  if (!city) {
    return <main className="container-michi">No hay datos disponibles.</main>
  }

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
            {cities.map((c) => (
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
          <WeatherCard
            location={city.location}
            condition={city.condition}
            temp={city.temp}
            max={city.max}
            min={city.min}
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
            <ForecastHourly data={city.hourly ?? []} />
          ) : (
            <ForecastWeekly data={city.weekly ?? []} />
          )}
        </div>

        {/* Stats */}
        <Stats
          propLLuvia={city.stats?.probLluvia ?? 0}
          propHumedad={city.stats?.humedad ?? 0}
          propViento={city.stats?.viento ?? 0}
        />
      </aside>
    </main>
  )
}
