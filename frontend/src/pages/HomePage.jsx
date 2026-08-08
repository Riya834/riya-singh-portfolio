import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/hero/Hero';
import About from '../components/about/About';
import Skills from '../components/skills/Skills';
import Experience from '../components/experience/Experience';
import Projects from '../components/projects/Projects';
import Leadership from '../components/leadership/Leadership';
import Education from '../components/education/Education';
import Certifications from '../components/certifications/Certifications';
import Contact from '../components/contact/Contact';
import Footer from '../components/common/Footer';
import CustomCursor from '../components/common/CustomCursor';
import { usePortfolio } from '../context/PortfolioContext';

export const HomePage = () => {
  const { loading, error } = usePortfolio();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-paper relative selection:bg-brand-electric selection:text-white">
      {/* Custom Desktop Ring Cursor */}
      <CustomCursor />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Leadership />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
