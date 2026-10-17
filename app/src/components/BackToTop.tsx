"use client"; // Wajib ditambahkan agar bisa merespon event scroll dan klik

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Fungsi untuk mendeteksi seberapa jauh halaman di-scroll
  useEffect(() => {
    const toggleVisibility = () => {
      // Jika scroll ke bawah lebih dari 300px, tampilkan tombol
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Menambahkan event listener saat komponen dimuat
    window.addEventListener("scroll", toggleVisibility);

    // Membersihkan event listener saat komponen dilepas (mencegah memory leak)
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Fungsi untuk scroll mulus ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Tombol hanya akan dirender jika isVisible bernilai true */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          /* Class Tailwind di bawah ini sudah diubah menjadi warna hijau */
          className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          aria-label="Kembali ke atas"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </>
  );
}