import { weatherCardMap } from "../utils/weatherCardMap"

interface WeatherCardProps {
  location: string
  condition: string
  temp: number
  max: number
  min: number
}

export default function WeatherCard({ location, condition, temp, max, min }: WeatherCardProps) {
  // Obtener imágenes según la condición
  const { fondo, michi } = weatherCardMap[condition.toLowerCase()] ?? {}

  return (
    <div className="relative flex flex-col items-center w-full max-w-[520px] mx-auto text-center">
      {/* Títulos */}
      <div className="mb-2 w-full px-4 sm:px-0">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--dark)] dark:text-[var(--white)]">
          {location}
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--accent)]">
          {condition}
        </h3>
      </div>

      {/* Fondo circular + michi */}
      <div className="relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden flex items-center justify-center mx-auto bg-transparent">
        {fondo && (
          <img
            src={fondo}
            alt="fondo clima"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {michi && (
          <img
            src={michi}
            alt="michi"
            className="absolute bottom-[2%] left-[8%] w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] object-contain"
          />
        )}
      </div>

      {/* Temperaturas */}
      <div className="mt-2 flex items-center justify-center gap-8 px-4 sm:px-10 w-full max-w-[460px] mx-auto">
        <div className="flex-shrink-0">
          <h1 className="text-[72px] md:text-[96px] font-extrabold text-[var(--dark)] dark:text-[var(--white)] leading-none">
            {temp}°
          </h1>
        </div>

        <div className="flex flex-col justify-center text-base sm:text-lg md:text-xl text-[var(--muted)]">
          <p>
            Máx:{" "}
            <span className="text-[var(--dark)] dark:text-[var(--white)] font-semibold">
              {max}°
            </span>
          </p>
          <p>
            Mín:{" "}
            <span className="text-[var(--dark)] dark:text-[var(--white)] font-semibold">
              {min}°
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
