import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Sidebar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };
  

  return (
    <motion.nav
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '80px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 0',
        background: scrolled ? 'rgba(5,8,16,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderRight: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
    

      {/* Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        {links.map((l, i) => (
          <motion.button
            key={l}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            onClick={() => scrollTo(l)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Mono',
              fontSize: '0.72rem',
              color: '#6b7280',
              letterSpacing: '0.15em',
              transition: 'color 0.2s',
              // writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}
            whileHover={{ color: '#00f5c4' }}
          >
            {String(i + 1).padStart(2, '0')}. {}
          </motion.button>
        ))}
      </div>

    
    </motion.nav>
  );
}