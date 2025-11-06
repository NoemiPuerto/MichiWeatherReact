import FondoLLuvios from '../assets/Fondos/lluvioso.png'
import MichiNegroLLuvia from '../assets/Michi_negro/gato_lluvia.png'

interface WeatherCardProps {
  location: string
  condition: string
  temp: number
  max: number
  min: number
}

export default function WeatherCard({ location, condition, temp, max, min }: WeatherCardProps) {
  return (
    <div className="flex flex-col items-center lg:items-start gap-4">

      <div className="text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{location}</h2>
        <h3 className="text-lg sm:text-2xl md:text-3xl">{condition}</h3>
      </div>

      <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]">
        <img
          src={FondoLLuvios}
          alt="fondo clima"
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />
        <img
          src={MichiNegroLLuvia}
          alt="gatito clima"
          className="relative w-[90px] h-[90px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] mx-auto top-1/2 transform -translate-y-1/2"
        />
      </div>

      <div className="text-center lg:text-left mt-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{temp}°</h1>
        <div className="flex gap-4 text-base sm:text-lg">
          <span>Máx: {max}°</span>
          <span>Mín: {min}°</span>
        </div>
      </div>

    </div>
  )
}
