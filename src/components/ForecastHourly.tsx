type Hour = {
  label: string
  icon?: string
  temp: number
}

interface Props {
  data?: Hour[]
}

export default function ForecastHourly({ data = [] }: Props) {
  if (!Array.isArray(data) || data.length === 0) {
    return null
  }

  return (
    <section aria-label="Pronóstico por horas" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((hour, i) => (
          <div
            key={i}
            className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
          >
            <p className="text-sm font-semibold text-[var(--muted)]">{hour.label}</p>

            {hour.icon ? (
              <img
                src={`/icons/${hour.icon}.svg`}
                alt={hour.icon}
                className="w-8 h-8 my-2"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-8 h-8 my-2" />
            )}

            <p className="text-lg font-bold text-[var(--accent)]">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </section>
  )
}
