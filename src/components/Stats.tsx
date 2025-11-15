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
    { icon: vientoIcon, value: `${propViento} km/h`, alt: 'Viento' }
  ]

  return (
    <div className="w-full px-4 sm:px-0 py-4">
      <div className="flex flex-row justify-center items-center gap-6 w-full overflow-x-auto pb-3 scroll-hidden">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center min-w-[110px]">
            <div className="w-[110px] h-[110px] rounded-full bg-[var(--panel)] dark:bg-[var(--glass)] flex flex-col items-center justify-center shadow-michi-1">
              <img src={stat.icon} alt={stat.alt} className="w-10 h-10 mb-1" />
              <p className="font-semibold text-sm text-[var(--dark)] dark:text-[var(--white)]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
