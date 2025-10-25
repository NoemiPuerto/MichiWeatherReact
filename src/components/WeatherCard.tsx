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
      
      <div className="text-center lg:text-left absolute">
        <h2 className="text-5xl font-bold">{location}</h2>
        <h3 className="text-3xl">{condition}</h3>
      </div>

      <div className="relative w-180 h-180">
        <img
          src={FondoLLuvios}
          alt="fondo clima"
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />
        <img
          src={MichiNegroLLuvia}
          alt="gatito clima"
          className="relative w-130 h-130 mx-auto mt-50"
        />
      </div>

      <div className="text-center lg:text-left -mt-30">
        <h1 className="text-5xl font-bold">{temp}°</h1>
        <div className="flex gap-4 text-lg">
          <span>Máx: {max}°</span>
          <span>Mín: {min}°</span>
        </div>
      </div>

    </div>
  )
}
