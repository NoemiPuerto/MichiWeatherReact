import React from "react"
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi"

export const weatherIconMap: Record<string, React.ReactElement> = {
  clear: React.createElement(WiDaySunny),
  cloudy: React.createElement(WiCloud),
  rain: React.createElement(WiRain),
  storm: React.createElement(WiThunderstorm),
  snow: React.createElement(WiSnow),
  fog: React.createElement(WiFog),
}
