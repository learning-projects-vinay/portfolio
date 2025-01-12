import { Box, Container } from '@mui/material';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from 'react';

import { CustomAppBar, MainFooter } from '../components';
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
  title: "Portfolio",
  description: "Here's your journey start to get to know me.",
};
const RootLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* AppBar (Header with Navigation Buttons) */}
        <CustomAppBar />
        <Box sx={{ marginTop: "70px" }}>

          {/* Main Content Area */}
          <Container sx={{ mt: 5 }}>
            {children}
          </Container>

        </Box>
        {/* Footer with Copyright */}
        <MainFooter />
      </body>

    </html>
  );
};

export default RootLayout;
