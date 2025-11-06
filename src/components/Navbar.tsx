import { Link } from 'react-router-dom'
import logo from '../assets/Logo/MichiWeatherLight.png'

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-6 md:left-1/2 md:-translate-x-1/2 mx-auto w-11/12 max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-full bg-gradient-to-r from-[#061c22] to-[#365d39] flex justify-center items-center py-3 px-6 md:px-10 rounded-full backdrop-blur-md text-white shadow-lg z-10">
      <nav aria-label="Global" className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="michiweather Logo" className="h-10 sm:h-12 md:h-14 w-auto" />
        </Link>
      </nav>
    </header>
  )
}
