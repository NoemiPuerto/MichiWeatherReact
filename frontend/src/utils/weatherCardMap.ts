// src/utils/weatherCardMap.ts
import MichiSol from "../assets/michis/michi-sol.png";
import MichiParcial from "../assets/michis/michi-parcial.png";
import MichiLluvia from "../assets/michis/michi-lluvia.png";
import MichiNublado from "../assets/michis/michi-nublado.png";

// opcionales (si los agregas)
//import MichiTormenta from "../assets/michis/michi-tormenta.png";
//import MichiNieve from "../assets/michis/michi-nieve.png";
//import MichiNiebla from "../assets/michis/michi-niebla.png";

import FondoSoleado from "../assets/weather/soleado.png";
import FondoParcial from "../assets/weather/parcial.png";
import FondoLluvioso from "../assets/weather/lluvioso.png";
import FondoNublado from "../assets/weather/nublado.png";

//import FondoTormenta from "../assets/weather/tormenta.png";
//import FondoNieve from "../assets/weather/nieve.png";
//import FondoNiebla from "../assets/weather/niebla.png";

export const weatherCardMap: Record<string, { fondo?: string; michi?: string }> = {
  soleado: { fondo: FondoSoleado, michi: MichiSol },
  parcial: { fondo: FondoParcial, michi: MichiParcial },
  nublado: { fondo: FondoNublado, michi: MichiNublado },
  lluvioso: { fondo: FondoLluvioso, michi: MichiLluvia },

  // opcionales
  //tormenta: { fondo: FondoTormenta, michi: MichiTormenta },
  //nieve: { fondo: FondoNieve, michi: MichiNieve },
  //niebla: { fondo: FondoNiebla, michi: MichiNiebla },
};
