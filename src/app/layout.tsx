// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlightInfo - Informasi Penerbangan Real-time",
  description: "Sistem Informasi Penerbangan Real-time untuk Bandara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-black`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              © 2026 FlightInfo. Sistem Informasi Penerbangan Real-time.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}