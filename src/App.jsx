import { useState, useEffect } from "react";
import ThreeBackground from "./components/ThreeBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skill from "./sections/Skill";

import Contact from "./sections/Contact";
import About from "./sections/About";


export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        :root {
          --bg: #050810;
          --bg2: #080d1a;
          --accent: #3499fd;
          --second: #7b61ff;
          --accent2: #7b61ff;
          --accent3: #ff6b6b;
          --text: #e8eaf6;
          --text-muted: #6b7280;
          --glass: rgba(255,255,255,0.04);
          --glass-border: rgba(255,255,255,0.08);
          --glow: 0 0 40px rgba(0,245,196,0.15);
          --bigwords: "'Barlow', sans-serif";
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; user-select: none; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
        .mono { font-family: 'DM Mono', monospace; }
        section { min-height: 100vh; position: relative; }
        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .glass-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          border-color: rgba(0,245,196,0.3);
          box-shadow: 0 0 40px rgba(0,245,196,0.15);
        }
        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          padding: 4px 10px;
          border-radius: 4px;
          background: rgba(0,245,196,0.08);
          border: 1px solid rgba(0,245,196,0.2);
          color: var(--accent);
          letter-spacing: 0.05em;
        }
        .h2 { font-weight: 100; }
      `}</style>
      <CustomCursor />
      {!isMobile && <ThreeBackground />}
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />

        <Experience />
        <Projects />
        <Skill />

        <Contact />
        {/* <Demo/> */}
      </main>
    </div>
  );
}
