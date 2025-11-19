// src/components/ForecastHourly.tsx
import type { IconType } from "react-icons";
import { WiDaySunny, WiCloud, WiRain, WiNightClear } from "react-icons/wi";

export interface HourlyForecast {
  label: string;
  icon?: string; // "sol", "nublado", "lluvia", "noche", "llovizna", "granizo", ...
  temp: number;
}

interface ForecastHourlyProps {
  data?: HourlyForecast[];
}

// Mapeo string -> React Icon (IconType)
const iconMap: Record<string, IconType> = {
  sol: WiDaySunny,
  soleado: WiDaySunny,
  nublado: WiCloud,
  parcial: WiCloud,
  lluvia: WiRain,
  lluvioso: WiRain,
  llovizna: WiRain,
  granizo: WiRain,
  noche: WiNightClear,
};

export default function ForecastHourly({ data = [] }: ForecastHourlyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico por horas" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((hour, i) => {
          const IconComponent = hour.icon ? iconMap[hour.icon] : null;

          return (
            <div
              key={i}
              className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
            >
              <p className="text-sm font-semibold text-[var(--muted)]">{hour.label}</p>

              {IconComponent ? (
                <IconComponent
                  className="text-[var(--dark)] dark:text-[var(--accent)] text-2xl my-2"
                  aria-hidden
                />
              ) : (
                <div className="w-8 h-8 my-2" />
              )}

              <p className="text-lg font-bold text-[var(--accent)]">{hour.temp}°</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
