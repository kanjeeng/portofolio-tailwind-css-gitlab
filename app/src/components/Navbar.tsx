"use client"; // INI WAJIB ADA: Mengubah komponen menjadi Client Component agar interaktif

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // State untuk melacak apakah menu mobile sedang terbuka atau tertutup
  const [isOpen, setIsOpen] = useState(false);

  // Daftar link navigasi diubah menjadi Bahasa Inggris
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/project" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm top-0 left-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Bagian Kiri: Logo / Nama */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              Portofolio<span className="text-blue-600">.</span>
            </Link>
          </div>

          {/* Bagian Tengah/Kanan: Menu Desktop (Sembunyi di Mobile) */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bagian Kanan: Tombol Hamburger (Hanya Tampil di Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  // Ikon "X" jika menu sedang terbuka
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Ikon Hamburger (3 garis) jika menu tertutup
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tampilan Dropdown Menu Mobile */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg border-b border-gray-100 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              // Menutup menu secara otomatis saat link diklik
              onClick={() => setIsOpen(false)} 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}