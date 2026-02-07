"use client";

import { Box } from '@mui/material';
import ThemeContextProvider from '../contexts/ThemeContext';
import CustomAppBar from '../components/appBar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import Services from '../components/sections/Services';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';
import MainFooter from '../components/footers/main';

export default function Home() {
  return (
    <ThemeContextProvider>
      <Box sx={{ minHeight: '100vh' }}>
        <CustomAppBar />
        <main>
          <Hero />
          <About />
          <Stats />
          <Services />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <MainFooter />
      </Box>
    </ThemeContextProvider>
  );
}