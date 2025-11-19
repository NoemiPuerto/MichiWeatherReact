// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WeatherPage from "./pages/WeatherPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen pt-20 pb-5">
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/weather/:city" element={<WeatherPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
