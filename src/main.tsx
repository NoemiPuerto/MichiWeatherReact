import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WeatherPage from './components/WeatherPage'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen pt-28 pb-28">
        <WeatherPage />
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
