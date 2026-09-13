import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import UseFooter from "./_components/Footer/UseFooter";

const myfont = Inter({
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "PULSE",
  description: "PULSE — Absolute Cinema",
};

export default function RootLayout({ children, }:
  Readonly<{

    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
      style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
    >
      <body className={`${myfont.className} bg-slate-950 text-white min-h-full flex flex-col`} >
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <UseFooter />
      </body>
    </html>
  );
}
