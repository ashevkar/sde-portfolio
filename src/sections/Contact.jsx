import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ContactOrb() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.4;
    ref.current.rotation.x = clock.getElapsedTime() * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
      <meshStandardMaterial color="#00f5c4" wireframe opacity={0.5} transparent />
    </mesh>
  );
}

const links = [
  { label: 'Email', value: 'ashshevkar@gmail.com', href: 'mailto:ashshevkar@gmail.com', icon: '✉' },
  { label: 'Phone', value: '(872) 664-2261', href: 'tel:8726642261', icon: '☎' },
  { label: 'Location', value: 'Phoenix, AZ', href: '#', icon: '⌖' },
  { label: 'LinkedIn', value: 'linkedin.com/in/aish06', href: 'https://www.linkedin.com/in/aish06/', icon: '⟡' },
  { label: 'GitHub', value: 'github.com/ashshevkar', href: 'https://github.com/ashevkar', icon: '◈' },
];

export default function Contact() {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const [copied, setCopied] = useState('');

  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section id="contact" style={{ padding: '3rem 8%', minHeight: '80vh' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="section-label">05 — Contact</p>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
          Let's <span style={{ color: '#00f5c4' }}>Connect</span>
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.8, marginBottom: '4rem' }}>
          Open to full-time roles, freelance projects, and interesting collaborations.
          Drop me a message — I typically respond within 24 hours.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem', alignItems: 'center' }}>
        <div  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.2 }}
              whileHover={{ x: 10 }}
              onClick={(e) => {
                if (link.label === 'Email' || link.label === 'Phone') {
                  e.preventDefault();
                  copy(link.value, link.label);
                }
              }}
              className="glass-card"
              target="_blank"
              style={{
                padding: '1.2rem 1.8rem',
                display: 'flex', alignItems: 'center', gap: '1.2rem',
                textDecoration: 'none', color: 'inherit', cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '1.2rem', width: '24px', textAlign: 'center', color: '#00f5c4' }}>
                {link.icon}
              </span>
              <div>
                <div style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: '#6b7280', letterSpacing: '0.15em', marginBottom: '2px' }}>
                  {link.label}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#e8eaf6' }}>{link.value}</div>
              </div>
              {copied === link.label && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ marginLeft: 'auto', fontFamily: 'DM Mono', fontSize: '0.65rem', color: '#00f5c4' }}
                >
                  Copied!
                </motion.span>
              )}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ height: '380px' }}
        >
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[2, 2, 2]} color="#00f5c4" intensity={3} />
            <pointLight position={[-2, -2, -2]} color="#7b61ff" intensity={2} />
            <ContactOrb />
          </Canvas>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '6rem', paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: '#6b7280' }}>
          Aishwarya Shevkar © 2025 — Built with React + Three.js
        </span>
        <span style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: '#00f5c4' }}>
          Phoenix, AZ
        </span>
      </motion.div>
    </section>
  );
}
