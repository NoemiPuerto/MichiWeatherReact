import { useState } from 'react'
import WeatherCard from './WeatherCard'
import ForecastHourly from './ForecastHourly'
import ForecastWeekly from './ForecastWeekly'
import Stats from './Stats'

export default function WeatherPage() {
  const [viewMode, setViewMode] = useState<'hoy' | 'semana'>('hoy')

  return (
    <main className="container mx-auto my-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8 items-center">

        {/* Columna izquierda */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start gap-6">
          <WeatherCard
            location="Cancún"
            condition="Lluvia"
            temp={27}
            max={31}
            min={23}
          />
        </div>

        {/* Columna derecha */}
        <div className="lg:w-1/2 flex flex-col items-center gap-6">

          {/* Botones "Hoy" / "Semana" */}
          <div className="flex gap-4">
            <button
              onClick={() => setViewMode('hoy')}
              className={`px-10 py-2 rounded-lg font-semibold ${
                viewMode === 'hoy'
                  ? 'bg-[#365d39] text-white hover:bg-green-700'
                  : 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => setViewMode('semana')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                viewMode === 'semana'
                  ? 'bg-[#365d39] text-white hover:bg-green-700'
                  : 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              Semana
            </button>
          </div>

          {/* Pronóstico dinámico */}
          {viewMode === 'hoy' ? <ForecastHourly /> : <ForecastWeekly />}

          {/* Indicadores */}
          <Stats propLLuvia={80} propHumedad={70} propViento={15} />

        </div>
      </div>
    </main>
  )
}
