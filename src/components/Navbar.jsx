import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['Hero', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Sidebar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Hero');

  useEffect(() => {
    const handleScroll = () => {
      // Navbar background change
      setScrolled(window.scrollY > 50);

      // Detect active section
      const scrollPos = window.scrollY + window.innerHeight / 2;

      links.forEach((link) => {
        const section = document.getElementById(link.toLowerCase());
        if (!section) return;

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          setActive(link);
        }
      });
    };

    

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActive(id); // instant highlight on click
    }
  };

  return (
    <motion.nav
      initial={{ x: 100 }}
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
        // background: scrolled ? 'transparent' : 'transparent',
        // backdropFilter: scrolled ? 'blur(20px)' : 'none',
        // borderLeft: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {links.map((l, i) => (
          <motion.button
            key={l}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            onClick={() => scrollTo(l)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Mono',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              color: active === l ? '#00f5c4' : '#6b7280',
              transition: 'all 0.25s ease',
              textOrientation: 'upright',
            }}
            whileHover={{ color: '#00f5c4', scale: 1.1 }}
          >
            {String(i + 1).padStart(2, '0')}. {}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}