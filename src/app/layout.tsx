import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ 
  subsets: ["latin"],
  variable: '--font-raleway',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: '--font-opensans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
  icons: {
    icon: [
      {
        url: '/images/vinay_favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${openSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}