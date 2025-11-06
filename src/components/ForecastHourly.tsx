import { useState, useEffect } from 'react'
import lluviaIcon from '../assets/Iconos_dark/lluvia_icon_dark.svg'
import nubladoIcon from '../assets/Iconos_dark/nublado_icon_dark.svg'
import lluviznaIcon from '../assets/Iconos_dark/llovizna_icon_dark.svg'
import granizoIcon from '../assets/Iconos_dark/granizo_icon_dark.svg'

interface HourData {
  label: string
  icon: string
  temp: number
}

export default function ForecastHourly() {
  const [hours, setHours] = useState<HourData[]>([])
  const [loading, setLoading] = useState(true)

  const mockHours: HourData[] = [
    { label: 'Now', icon: lluviaIcon, temp: 22 },
    { label: '11:00', icon: nubladoIcon, temp: 31 },
    { label: '14:00', icon: lluviznaIcon, temp: 25 },
    { label: '17:00', icon: granizoIcon, temp: 29 },
  ]

  useEffect(() => {
    async function fetchHourlyForecast() {
      try {
        const response = await fetch('https://api.tuapi.com/hourly') // reemplaza con tu endpoint
        if (!response.ok) throw new Error('Error en la API')
        const data = await response.json()

        const mappedData: HourData[] = Array.isArray(data)
          ? data.map((item: any) => ({
              label: item.time,
              icon: item.icon,
              temp: item.temp,
            }))
          : []

        setHours(mappedData.length ? mappedData : mockHours)
      } catch (error) {
        console.error('Error fetching hourly forecast:', error)
        setHours(mockHours) // fallback
      } finally {
        setLoading(false)
      }
    }

    fetchHourlyForecast()
  }, [])

  if (loading) return <p>Cargando...</p>

  return (
    <div className="flex gap-4 overflow-x-auto py-2 px-2">
      {hours.map((hour, idx) => (
        <div key={idx} className="flex flex-col items-center min-w-[80px]">
          <p className="text-sm">{hour.label}</p>
          <img
           src={hour.icon}
            alt={hour.label}
            className="w-[30px] h-[30px]"
          />
          <p className="text-sm">{hour.temp}°</p>
        </div>
      ))}
    </div>
  )
}
