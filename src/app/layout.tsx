import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eProduct | Premium Essentials",
  description: "Minimalist black and white essentials for modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-black selection:text-white">
        <header className="sticky top-0 z-50 w-full border-b border-black bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div className="font-bold text-2xl tracking-tighter uppercase">eProduct</div>
            <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
              <a href="#" className="hover:underline underline-offset-4">Shop</a>
              <a href="#" className="hover:underline underline-offset-4">Collections</a>
              <a href="#" className="hover:underline underline-offset-4">About</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="text-sm font-semibold tracking-widest uppercase hover:underline underline-offset-4">Cart (0)</button>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <footer className="w-full border-t border-black bg-white py-12 px-6">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium tracking-widest uppercase">
            <div>&copy; 2026 eProduct. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:underline underline-offset-4">Twitter</a>
              <a href="#" className="hover:underline underline-offset-4">Instagram</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
