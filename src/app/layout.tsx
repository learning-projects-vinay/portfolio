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
  title: "Vinay Panwar | Software Developer",
  description: "Software Developer with experience in building web applications, APIs, and cloud-based solutions. Specialized in Node.js, React, Azure, and modern web technologies.",
  keywords: ["Software Developer", "Web Developer", "Node.js", "React", "Azure", "TypeScript", "Full Stack Developer", "Vinay Panwar"],
  authors: [{ name: "Vinay Panwar" }],
  creator: "Vinay Panwar",
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_ASSET_PREFIX || ''}/images/vinay_favicon.ico`,
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