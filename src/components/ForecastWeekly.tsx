import lluviaIcon from '../assets/Iconos_dark/lluvia_icon_dark.svg'
import nubladoIcon from '../assets/Iconos_dark/nublado_icon_dark.svg'


const mockWeek = [
  { day: 'Lun', icon: lluviaIcon, max: 30, min: 22 },
  { day: 'Mar', icon: nubladoIcon, max: 28, min: 21 },
  { day: 'Mié', icon: lluviaIcon, max: 27, min: 20 },
  { day: 'Jue', icon: nubladoIcon, max: 29, min: 23 },
  { day: 'Vie', icon: lluviaIcon, max: 31, min: 24 },
  { day: 'Sáb', icon: nubladoIcon, max: 30, min: 23 },
  { day: 'Dom', icon: lluviaIcon, max: 29, min: 22 },
]


export default function ForecastWeekly() {
  return (
    <section className="flex gap-4 min-w-max">
      {mockWeek.map((d, i) => (
        <div
          key={i}
          className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
        >
          <p className="text-sm font-semibold text-[var(--muted)]">{d.day}</p>
          <img src={d.icon} alt={d.day} className="w-8 h-8 my-2" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-[var(--accent)]">{d.max}°</span>
            <span className="text-sm text-[var(--muted)]">{d.min}°</span>
          </div>
        </div>
      ))}
    </section>
  )
}
