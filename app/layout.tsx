import type { Metadata } from "next";
import { metadata } from "./metadata"; // ✅ Import metadata
import localFont from "next/font/local";
import './globals.css';
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://www.propertyplateau.com/wp-content/uploads/2023/09/logo-36x36.png"
        />
      </Head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ cursor: 'url("/Property_Plateau_logo1.png") 16 16, auto !important' }}
      >
        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
                                                                                      