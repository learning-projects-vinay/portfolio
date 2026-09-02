"use client";

import { Box } from '@mui/material';
import ThemeContextProvider from '../contexts/ThemeContext';
import CustomAppBar from '../components/appBar';
import Hero from '../components/sections/Hero';
import Releases from '../components/sections/Releases';
import Capabilities from '../components/sections/Capabilities';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import MainFooter from '../components/footers/main';
import AskAi from '../components/askAi';
import ConsoleProvider from '../components/console/ConsoleContext';
import ApiConsole from '../components/console/ApiConsole';

export default function Home() {
  return (
    <ThemeContextProvider>
      <ConsoleProvider>
        <Box sx={{ minHeight: '100vh' }}>
          <CustomAppBar />
          <main>
            <Hero />
            <Releases />
            <Capabilities />
            <About />
            <Contact />
          </main>
          <MainFooter />
          <AskAi />
          <ApiConsole />
        </Box>
      </ConsoleProvider>
    </ThemeContextProvider>
  );
}
