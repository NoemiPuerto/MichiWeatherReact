type Day = {
  day: string
  icon?: string
  max: number
  min: number
}

interface Props {
  data?: Day[]
}

export default function ForecastWeekly({ data = [] }: Props) {
  if (!Array.isArray(data) || data.length === 0) return null

  return (
    <section aria-label="Pronóstico semanal" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((d, i) => (
          <div
            key={i}
            className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
          >
            <p className="text-sm font-semibold text-[var(--muted)]">{d.day}</p>

            {d.icon ? (
              <img
                src={`/icons/${d.icon}.svg`}
                alt={d.icon}
                className="w-8 h-8 my-2"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-8 h-8 my-2" />
            )}

            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-[var(--accent)]">{d.max}°</span>
              <span className="text-sm text-[var(--muted)]">{d.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
