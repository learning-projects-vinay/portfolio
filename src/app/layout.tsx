import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://learning-projects-vinay.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vinay Panwar — Senior Software Engineer · Backend & AI",
  description:
    "Senior Software Engineer shipping production Node.js/TypeScript backends and AI agent systems on Azure. 200+ REST APIs, event-driven architecture, LLM orchestration. Open to roles and select client work.",
  keywords: [
    "Vinay Panwar",
    "Senior Software Engineer",
    "Backend Developer",
    "Node.js",
    "TypeScript",
    "Azure",
    "AI Engineering",
    "LLM Orchestration",
    "AI Agents",
    "Hire Backend Developer",
  ],
  authors: [{ name: "Vinay Panwar" }],
  creator: "Vinay Panwar",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Vinay Panwar — Senior Software Engineer · Backend & AI",
    description:
      "I build production backends and the AI systems around them. 200+ REST APIs shipped, 50% latency cuts, multi-agent LLM workflows — Node.js · TypeScript · Azure.",
    images: [
      {
        url: "/images/63460.png",
        width: 1254,
        height: 1254,
        alt: "Vinay Panwar",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Vinay Panwar — Senior Software Engineer · Backend & AI",
    description:
      "I build production backends and the AI systems around them. Node.js · TypeScript · Azure · AI agents.",
    images: ["/images/63460.png"],
  },
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_ASSET_PREFIX || ""}/images/vinay_favicon.ico`,
        sizes: "any",
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
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
