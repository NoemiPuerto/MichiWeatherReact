import WeatherCard from './WeatherCard'
import ForecastHourly from './ForecastHourly'
import Stats from './Stats'

export default function WeatherPage() {
  

  return (
    <main className={`container mx-auto my-8 px-4 `}>
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
            <button className="bg-[#365d39] hover:bg-green-700 text-white px-10 py-2 rounded-lg font-semibold">Hoy</button>
            <button className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg font-semibold">Semana</button>
          </div>

          {/* Pronóstico horario */}
          <ForecastHourly/>

          {/* Indicadores */}
          <Stats propLLuvia={0} propHumedad={0} propViento={0}/>

        </div>
      </div>
    </main>
  )
}
