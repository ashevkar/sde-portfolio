import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

function AnimatedSphere() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.distort = 0.3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
  });
  return (
    <Sphere args={[1, 64, 64]}>
      <MeshDistortMaterial ref={ref} color="#7b61ff" attach="material"
        distort={0.3} speed={2} roughness={0} metalness={0.8}
        envMapIntensity={1} transparent opacity={0.85}
      />
    </Sphere>
  );
}

function HeroSphere() {
  return (
    <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: '420px', height: '420px', opacity: 0.7 }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} color="#00f5c4" intensity={3} />
        <pointLight position={[-2, -1, -2]} color="#7b61ff" intensity={2} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}

const roles = ['Software Developer', 'Full-Stack Engineer', 'AI/ML Enthusiast', 'Cloud Architect'];

export default function Hero() {
  const roleRef = useRef();
  const idx = useRef(0);

  useEffect(() => {
    const cycle = () => {
      if (!roleRef.current) return;
      roleRef.current.style.opacity = '0';
      roleRef.current.style.transform = 'translateY(10px)';
      setTimeout(() => {
        idx.current = (idx.current + 1) % roles.length;
        roleRef.current.textContent = roles[idx.current];
        roleRef.current.style.opacity = '1';
        roleRef.current.style.transform = 'translateY(0)';
      }, 400);
    };
    const timer = setInterval(cycle, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" style={{ display: 'flex', alignItems: 'center', padding: '0 8%', position: 'relative', overflow: 'hidden', justifyContent: 'center'}}>
      <HeroSphere />

      <div style={{ maxWidth: '640px', zIndex: 10, display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'DM Mono', fontSize: '0.75rem', color: '#00f5c4', letterSpacing: '0.3em', marginBottom: '1.5rem' }}
        >
          01 — Hello, World
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '0.5rem' }}
        >
          Aishwarya
          <br />
          <span style={{ color: '#00f5c4' }}>Shevkar</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}
        >
          <span style={{ color: '#6b7280', fontFamily: 'DM Mono', fontSize: '1rem' }}>→</span>
          <span
            ref={roleRef}
            style={{
              fontFamily: 'DM Mono', fontSize: '1.1rem', color: '#e8eaf6',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {roles[0]}
          </span>
        </motion.div>

        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.8, maxWidth: '520px', marginBottom: '2.5rem' }}
        >
          Building scalable, AI-powered systems that solve real problems.
          5+ years turning complex requirements into elegant architecture —
          from microservices handling millions of users to vector-powered semantic search.
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,245,196,0.5)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg, #00f5c4, #7b61ff)',
              color: '#050810', fontWeight: 700, fontFamily: 'DM Mono',
              fontSize: '0.8rem', letterSpacing: '0.1em', padding: '14px 28px',
              borderRadius: '8px', textDecoration: 'none', cursor: 'pointer',
            }}
          >
            View My Work →
          </motion.a>
          <motion.a
            href="mailto:ashshevkar@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            style={{
              color: '#e8eaf6', fontFamily: 'DM Mono', fontSize: '0.8rem',
              letterSpacing: '0.1em', padding: '14px 28px',
              borderRadius: '8px', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ display: 'flex', gap: '2rem' }}
        >
          {[['3+', 'Years Exp.'], ['3', 'Companies'], ['15+', 'Projects'], ['20+', 'Technologies']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f5c4', fontFamily: 'Space Mono' }}>{num}</div>
              <div style={{ fontSize: '0.65rem', color: '#6b7280', fontFamily: 'DM Mono', letterSpacing: '0.1em', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{
          position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}
      >
        <span style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: '#6b7280', letterSpacing: '0.2em' }}>SCROLL</span>
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, #00f5c4, transparent)' }} />
      </motion.div>
    </section>
  );
}
