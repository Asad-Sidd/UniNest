import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import SplashScreen from "@/components/intro/SplashScreen";
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "UniNest - Accommodation & Navigation System",
  description: "Find the perfect PG and Hostel near Integral University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans min-h-screen flex flex-col bg-warm-white text-charcoal overflow-x-hidden`}>
        <ThemeProvider>
          <SplashScreen />
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
