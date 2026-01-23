import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {/* Noise texture overlay for depth */}
        <div className="noise-overlay" aria-hidden="true" />
        
        <div className="relative flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
          {/* Gradient glow at top */}
          <div 
            className="pointer-events-none fixed inset-x-0 top-0 h-[600px] gradient-radial-top opacity-60" 
            aria-hidden="true" 
          />
          
          <Navbar />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
