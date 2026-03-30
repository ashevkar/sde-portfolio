import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['Hero', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Sidebar() {
  const [active, setActive] = useState('Hero');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
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
      setActive(id);
    }
  };

  // Don't render at all on mobile
  if (isMobile) return null;

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
              color: active === l ? 'var(--accent)' : '#6b7280',
              transition: 'all 0.25s ease',
              textOrientation: 'upright',
            }}
            whileHover={{ color: 'var(--accent)', scale: 1.1 }}
          >

           <span
  style={{
    display: 'block',
    width: active === l ? '12px' : '6px',
    height: active === l ? '12px' : '6px',
    borderRadius: '50%',
    background: active === l ? 'var(--accent)' : 'transparent',
    border: `2px solid ${active === l ? 'var(--accent)' : '#6b7280'}`,
    transition: 'all 0.3s ease',
  }}
/>

          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}