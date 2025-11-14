import lluviaIcon from '../assets/Iconos_dark/lluvia_icon_dark.svg'
import nubladoIcon from '../assets/Iconos_dark/nublado_icon_dark.svg'
import lluviznaIcon from '../assets/Iconos_dark/llovizna_icon_dark.svg'
import granizoIcon from '../assets/Iconos_dark/granizo_icon_dark.svg'


const mockHours = [
  { label: 'Now', icon: lluviaIcon, temp: 22 },
  { label: '11:00', icon: nubladoIcon, temp: 31 },
  { label: '14:00', icon: lluviznaIcon, temp: 25 },
  { label: '17:00', icon: granizoIcon, temp: 29 },
  { label: '20:00', icon: nubladoIcon, temp: 26 },
  { label: '23:00', icon: lluviaIcon, temp: 24 },
]


export default function ForecastHourly() {
  return (
    <section className="flex gap-4 min-w-max">
      {mockHours.map((hour, i) => (
        <div
          key={i}
          className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
        >
          <p className="text-sm font-semibold text-[var(--muted)]">{hour.label}</p>
          <img src={hour.icon} alt={hour.label} className="w-8 h-8 my-2" />
          <p className="text-lg font-bold text-[var(--accent)]">{hour.temp}°</p>
        </div>
      ))}
    </section>
  )
}
