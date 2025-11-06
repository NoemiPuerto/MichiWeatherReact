import lluviaIcon from '../assets/Iconos_dark/lluvia_icon_dark.svg'
import nubladoIcon from '../assets/Iconos_dark/nublado_icon_dark.svg'

const mockWeek = [
  { day: 'Lunes', icon: lluviaIcon, max: 30, min: 22 },
  { day: 'Martes', icon: nubladoIcon, max: 28, min: 21 },
  { day: 'Miércoles', icon: lluviaIcon, max: 27, min: 20 },
  { day: 'Jueves', icon: nubladoIcon, max: 29, min: 23 },
  { day: 'Viernes', icon: lluviaIcon, max: 31, min: 24 },
]

export default function ForecastWeekly() {
  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {mockWeek.map((day, idx) => (
        <div key={idx} className="flex flex-col items-center min-w-[100px]">
          <p className="font-semibold">{day.day}</p>
          <img src={day.icon} alt={day.day} className="w-12 h-12" />
          <p>Máx: {day.max}°</p>
          <p>Mín: {day.min}°</p>
        </div>
      ))}
    </div>
  )
}