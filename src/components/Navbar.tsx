import { Link } from 'react-router-dom'
import logo from '../assets/Logo/MichiWeatherLight.png'

export default function Navbar() {
  return (
    <header className="w-11/12 max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-full h-15 fixed bg-gradient-to-r from-[#061c22] to-[#365d39] flex justify-center items-center py-3 px-10 left-1/2 -translate-x-1/2 top-[30px] rounded-full backdrop-blur-md text-white shadow-lg z-10">
      <nav aria-label="Global" className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="michiweather Logo" className="h-14 w-auto" />
        </Link>
      </nav>
    </header>
  )
}
