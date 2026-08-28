"use client";

import { Box } from '@mui/material';
import ThemeContextProvider from '../contexts/ThemeContext';
import CustomAppBar from '../components/appBar';
import Hero from '../components/sections/Hero';
import Impact from '../components/sections/Impact';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
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
            <Impact />
            <Projects />
            <Experience />
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
