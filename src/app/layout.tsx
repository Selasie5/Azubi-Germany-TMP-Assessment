import type { Metadata } from "next";
import { Manrope} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AppProviders from "./AppProviders";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Audiophile",
  description: "Audiophile is a modern e-commerce website for high-end audio equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
