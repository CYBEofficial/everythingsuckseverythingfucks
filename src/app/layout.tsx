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
  title: "🔥💿🎵 EVERYTHING SUCKS EVERYTHING FUCKS 🎵💿🔥",
  description: "GET FUCKED!!! Click here for FUCKED tunes and tracks that SUCK!!! Best viewed in Netscape Navigator!!! 🎧🌟🚀",
  keywords: "everything sucks everything fucks, billain, soundcloud",
  authors: [{ name: "BILLAIN" }],
  robots: "index, follow, max-snippet:-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
