import sombrillaIcon from '../assets/Iconos_dark/sombrilla_icon_dark.svg'
import humedadIcon from '../assets/Iconos_dark/humedad_icon_dark.svg'
import vientoIcon from '../assets/Iconos_dark/viento_icon_dark.svg'

interface StatsProps {
  propLLuvia: number
  propHumedad: number
  propViento: number
}

export default function Stats({ propLLuvia, propHumedad, propViento }: StatsProps) {
  const stats = [
    { icon: sombrillaIcon, value: `${propLLuvia}%`, alt: 'Lluvia' },
    { icon: humedadIcon, value: `${propHumedad}%`, alt: 'Humedad' },
    { icon: vientoIcon, value: `${propViento} km/h`, alt: 'Viento' },
  ]

  return (
    <div className="flex gap-6 justify-center">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <img
            src={stat.icon}
            alt={stat.alt}
            className="w-12 h-12"
          />
          <p className="mt-1 font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
