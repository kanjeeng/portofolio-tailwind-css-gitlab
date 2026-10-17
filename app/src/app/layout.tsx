import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Tambahkan import untuk komponen BackToTop
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanjeng Dhimas Cahyoherlina | DevOps, Infrastructure & Security Engineer",
  description:
    "Portfolio of Kanjeng Dhimas Cahyoherlina — a DevOps, Cloud Infrastructure & Security Engineer specializing in CI/CD automation, containerization, and secure network architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="myprofile.png" />
      </head>
      <body id="top" className={inter.className}>
        {children}
        
        {/* 2. Tambahkan komponen di sini agar muncul di seluruh halaman web */}
        <BackToTop />
      </body>
    </html>
  );
}