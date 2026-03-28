import "./index.css";
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
  return (
    <div style={{ position: "relative" }}>
      <CustomCursor />
      <ThreeBackground />
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
