import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiMenu, FiMoon, FiSun, FiX, FiSearch } from 'react-icons/fi'

export default function Navbar() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.getAttribute('data-theme') === 'dark'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    if (toggleRef.current) toggleRef.current.setAttribute('aria-pressed', dark ? 'true' : 'false')
  }, [dark])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() !== '') {
      // placeholder: reemplaza por navegación / búsqueda real
      alert(`Buscando: ${query}`)
      setQuery('')
    }
  }

  const iconClass = 'text-[var(--accent)]'

  return (
    <header className="w-full fixed top-0 left-0 z-40 bg-[var(--panel)] dark:bg-[var(--panel)] shadow-md transition-colors duration-300">
      <div className="container-michi flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-wide text-[var(--accent)] dark:text-[var(--white)]">
              MichiWeather
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-6">
            <Link to="/" className="font-semibold text-sm text-[var(--dark)] dark:text-[var(--white)] hover:text-[var(--accent)] transition">
              Inicio
            </Link>
            <Link to="/ubicaciones" className="font-semibold text-sm text-[var(--dark)] dark:text-[var(--white)] hover:text-[var(--accent)] transition">
              Ubicaciones
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-[var(--white)]/80 dark:bg-[var(--glass)] rounded-full px-3 py-1 shadow-michi-1">
            <FiSearch className={`${iconClass} mr-2`} />
            <input
              type="text"
              placeholder="Buscar ciudad..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-[var(--dark)] dark:text-[var(--white)] placeholder-[var(--muted)]"
            />
          </form>

          <button
            ref={toggleRef}
            onClick={() => setDark((s) => !s)}
            title="Cambiar tema"
            aria-label="Cambiar tema"
            className="h-9 w-9 rounded-full grid place-items-center hover:shadow-michi-1 transition bg-transparent"
          >
            {dark ? <FiSun className={iconClass} /> : <FiMoon className={iconClass} />}
          </button>

          <Link to="/perfil" title="Perfil" className="h-9 w-9 rounded-full grid place-items-center hover:shadow-michi-1 transition bg-transparent">
            <FiUser className={iconClass} />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-9 w-9 inline-flex items-center justify-center lg:hidden hover:bg-[var(--accent)]/10 transition rounded"
            aria-label="Abrir menú"
          >
            {menuOpen ? <FiX className="text-[var(--dark)] dark:text-[var(--white)]" /> : <FiMenu className="text-[var(--dark)] dark:text-[var(--white)]" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[var(--panel)] dark:bg-[var(--panel)] border-t border-[var(--glass)] py-4 px-6 space-y-3 animate-fade-in">
          <Link to="/" className="block font-medium hover:text-[var(--accent)] transition">Inicio</Link>
          <Link to="/ubicaciones" className="block font-medium hover:text-[var(--accent)] transition">Ubicaciones</Link>
        </div>
      )}
    </header>
  )
}
