// WeatherCard mapping: condición -> imágenes
import MichiSol from "../assets/michis/michi-sol.png"
import MichiParcial from "../assets/michis/michi-parcial.png"
import MichiLluvia from "../assets/michis/michi-lluvia.png"
import MichiNublado from "../assets/michis/michi-nublado.png"

import FondoSoleado from "../assets/weather/soleado.png"
import FondoLluvioso from "../assets/weather/lluvioso.png"
import FondoNublado from "../assets/weather/nublado.png"
import FondoParcial from "../assets/weather/parcial.png"

export const weatherCardMap: Record<string, { fondo: string; michi: string }> = {
  sol: { fondo: FondoSoleado, michi: MichiSol },
  soleado: { fondo: FondoSoleado, michi: MichiSol },

  nublado: { fondo: FondoNublado, michi: MichiNublado },

  lluvia: { fondo: FondoLluvioso, michi: MichiLluvia },
  lluvioso: { fondo: FondoLluvioso, michi: MichiLluvia },

  parcial: { fondo: FondoParcial, michi: MichiParcial },
  "parcialmente nublado": { fondo: FondoParcial, michi: MichiParcial },
}
