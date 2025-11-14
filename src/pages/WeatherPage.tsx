import { useState } from 'react'
import WeatherCard from '../components/WeatherCard'
import ForecastHourly from '../components/ForecastHourly'
import ForecastWeekly from '../components/ForecastWeekly'
import Stats from '../components/Stats'


export default function WeatherPage() {
  const [viewMode, setViewMode] = useState<'hoy' | 'semana'>('hoy')


  return (
    <main className="container-michi min-h-[calc(100vh-160px)] flex flex-col lg:flex-row items-center justify-center py-10 gap-12">
      <div className="flex justify-center w-full lg:w-1/2">
        <WeatherCard location="Cancún" condition="Lluvia" temp={27} max={31} min={23} />
      </div>


      <aside className="flex flex-col items-center gap-8 w-full lg:w-1/2 max-w-[520px]">
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode('hoy')}
            className={`h-10 px-6 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'hoy'
                ? 'bg-[var(--accent)] text-white shadow-michi-1'
                : 'bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)] hover:bg-[var(--accent)]/20'
            }`}
          >
            Hoy
          </button>
          <button
            onClick={() => setViewMode('semana')}
            className={`h-10 px-6 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'semana'
                ? 'bg-[var(--accent)] text-white shadow-michi-1'
                : 'bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)] hover:bg-[var(--accent)]/20'
            }`}
          >
            Semana
          </button>
        </div>


        <div className="w-full overflow-x-auto p-4 rounded-xl bg-[var(--panel)]/50 dark:bg-[var(--glass)] shadow-michi-1 scroll-hidden">
          {viewMode === 'hoy' ? <ForecastHourly /> : <ForecastWeekly />}
        </div>


        <Stats propLLuvia={80} propHumedad={70} propViento={15} />
      </aside>
    </main>
  )
}
